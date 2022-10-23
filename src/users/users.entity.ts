import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role, UserEntityTypes } from '../../types';
import { Posts } from '../posts/posts.entity';
import { Likes } from '../likes/likes.entity';

@Entity()
export class UsersEntity extends BaseEntity implements UserEntityTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column({
    length: 50,
  })
  lastname: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    length: 2000,
    nullable: true,
    default: true,
  })
  description: string | null;

  @Column()
  role: Role;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: false,
  })
  isActive: boolean;

  @OneToMany((types) => Posts, (entity) => entity.userId)
  posts: Posts[];

  @OneToMany((types) => Likes, (entity) => entity.userId)
  likes: Likes[];
}
