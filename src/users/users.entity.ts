import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role, UserEntityTypes } from '../../types';
import { Posts } from '../posts/posts.entity';
import { Likes } from '../likes/likes.entity';
import { Comments } from '../comments/comments.entity';
import { Friends } from '../friends/friends.entity';

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

  @OneToMany(() => Posts, (entity) => entity.user)
  posts: Posts[];

  @OneToMany(() => Likes, (entity) => entity.user)
  likes: Likes[];

  @OneToMany(() => Comments, (entity) => entity.user)
  comments: Comments[];

  @OneToOne(() => Friends, (entity) => entity.user)
  friends: Friends;
}
