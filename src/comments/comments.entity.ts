import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentsEntityType } from '../../types/comments';
import { UsersEntity } from '../users/users.entity';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Comments extends BaseEntity implements CommentsEntityType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20000,
  })
  content: string;

  @ManyToOne(() => Posts, (entity) => entity.id)
  post: string;

  @ManyToOne(() => UsersEntity, (entity) => entity.id)
  user: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  isActive: boolean;
}
