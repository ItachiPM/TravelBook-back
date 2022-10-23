import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LikeEntityTypes } from '../../types';
import { UsersEntity } from '../users/users.entity';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Likes extends BaseEntity implements LikeEntityTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (entity) => entity.id)
  user: UsersEntity;

  @ManyToOne(() => Posts, (entity) => entity.id)
  post: Posts;

  @Column({
    default: false,
  })
  isActive: boolean;
}
