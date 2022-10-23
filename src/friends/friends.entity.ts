import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity()
export class Friends extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UsersEntity, (entity) => entity.id)
  @JoinColumn()
  user: UsersEntity;

  @Column()
  friends: string;

  @Column()
  isActive: boolean;
}
