import { Users } from '../../src/users/users.entity';
import { Likes } from '../../src/likes/likes.entity';

export class PostEntityTypes {
  id: string;
  userId: Users;
  description: string;
  location: string;
  country: string;
  cost: number;
  rate: number;
  durationDay: number;
  createdAt: Date;
  isActive: boolean;
  likes: Likes[];
}
