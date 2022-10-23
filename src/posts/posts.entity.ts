import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntityTypes } from '../../types';
import { UsersEntity } from '../users/users.entity';
import { Likes } from '../likes/likes.entity';

@Entity()
export class Posts extends BaseEntity implements PostEntityTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (entity) => entity.posts)
  user: UsersEntity;

  @Column({
    length: 20000,
  })
  description: string;

  @Column()
  location: string;

  @Column()
  country: string;

  @Column()
  cost: number;

  @Column()
  rate: number;

  @Column()
  durationDay: number;

  @Column()
  createdAt: Date;

  @Column()
  isActive: boolean;

  @OneToMany(() => Likes, (entity) => entity.user)
  likes: Likes[];
}
