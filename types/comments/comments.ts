export interface CommentsEntityType {
  id: string;
  user: string;
  post: string;
  content: string;
  createdAt: Date;
  isActive: boolean;
}
