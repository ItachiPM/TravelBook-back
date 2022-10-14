import { Posts } from '../../src/posts/posts.entity';
import { Likes } from '../../src/likes/likes.entity';

export class UserEntityTypes {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  description: string;
  role: Role;
  createdAt: Date;
  posts: Posts[];
  likes: Likes[];
  isActive: boolean;
}

export enum Role {
  Admin = 'Admin',
  User = 'user',
}
