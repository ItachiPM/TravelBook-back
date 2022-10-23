import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersEntity } from '../users/users.entity';
import { pwdHash } from '../utils/pwdHash';
import { Response } from 'express';
import { JwtPayload } from './jwt.strategy';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { config } from '../../config/config';
import { jsonResponse } from '../utils/jsonResponse';
import { JsonResponse, JsonResponseStatus } from '../../types';
import { NewUserDto } from './dto/newUser.dto';
import { Role } from '../../types';
import { MailService } from '../mail/mail.service';
import { registerActivationEmail } from '../mail/tamplates/email/register-activation-email';

@Injectable()
export class AuthService {
  constructor(@Inject(MailService) private mailService: MailService) {}

  async register(newUser: NewUserDto): Promise<JsonResponse> {
    const { email, lastname, password, firstname } = newUser;
    const user = new UsersEntity();

    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = pwdHash(password);
    user.role = Role.User;

    await user.save();

    await this.mailService.sendMail(
      user.email,
      'Link aktywacyjny',
      registerActivationEmail(user.id),
    );

    return jsonResponse({
      code: 201,
      status: JsonResponseStatus.success,
      message: 'Users was successfully added.',
      data: {
        user: user as UsersEntity,
      },
    });
  }

  async login(req: LoginDto, res: Response) {
    try {
      const user = await UsersEntity.findOne({
        where: {
          email: req.email,
          password: pwdHash(req.password),
        },
      });

      if (!user) {
        return res.status(400).json(
          jsonResponse({
            code: 400,
            message: 'Invalid login data!',
            status: JsonResponseStatus.failed,
          }),
        );
      }

      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .status(200)
        .json(
          jsonResponse({
            code: 200,
            message: 'User was login successfully',
            status: JsonResponseStatus.success,
            data: {
              user,
            },
          }),
        );
    } catch (err) {
      res.status(400).json(
        jsonResponse({
          code: 200,
          message: err.message,
          status: JsonResponseStatus.failed,
        }),
      );
    }
  }

  async logout(user: UsersEntity, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.status(200).json(
        jsonResponse({
          code: 200,
          message: 'User was logout successfully',
          status: JsonResponseStatus.success,
          data: {
            user,
          },
        }),
      );
    } catch (err) {
      return res.status(400).json(
        jsonResponse({
          code: 200,
          message: err.message,
          status: JsonResponseStatus.failed,
        }),
      );
    }
  }

  async confirmRegister(user: UsersEntity) {
    if (user.isActive) {
      throw new HttpException(
        'User was confirmed before',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      user.isActive = true;

      await user.save();

      return jsonResponse({
        code: 200,
        message: 'User registration was confirmed',
        status: JsonResponseStatus.success,
      });
    }
  }

  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, config.secretOrKey, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: UsersEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await UsersEntity.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();
    return token;
  }
}
