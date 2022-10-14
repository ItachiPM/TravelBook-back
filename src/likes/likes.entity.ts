import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LikeEntityTypes } from '../../types';
import { UsersEntity } from '../users/users.entity';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Likes extends LikeEntityTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => UsersEntity, (entity) => entity.id)
  userId: UsersEntity;

  @ManyToOne((type) => Posts, (entity) => entity.id)
  postId: Posts;

  @Column({
    default: false,
  })
  isActive: boolean;
}
