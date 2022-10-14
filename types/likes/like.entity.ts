import { UserEntityTypes } from '../users';
import { PostEntityTypes } from '../posts';

export class LikeEntityTypes {
  id: string;
  userId: UserEntityTypes;
  postId: PostEntityTypes;
  isActive: boolean;
}
