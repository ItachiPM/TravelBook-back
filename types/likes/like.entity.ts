import { UserEntityTypes } from '../users';
import { PostEntityTypes } from '../posts';

export class LikeEntityTypes {
  id: string;
  user: UserEntityTypes;
  post: PostEntityTypes;
  isActive: boolean;
}
