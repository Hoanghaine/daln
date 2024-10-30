export interface IPost {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: number;
  address: string;
  imageUrl: string;
}

export interface IPostResponse {
  status: string;
  message: string;
  data: IPost;
}
