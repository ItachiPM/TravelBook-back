import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LikeEntityTypes } from '../../types';
import { Users } from '../users/users.entity';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Likes extends LikeEntityTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Users, (entity) => entity.id)
  userId: Users;

  @ManyToOne((type) => Posts, (entity) => entity.id)
  postId: Posts;

  @Column({
    default: false,
  })
  isActive: boolean;
}
