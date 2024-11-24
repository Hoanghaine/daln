export interface IPost {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  tag: string;
  liked: boolean;
  totalComment: number;
  totalLikes: number;
  avatar: string;
  thumbnail: string;
}
