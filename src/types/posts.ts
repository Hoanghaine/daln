export interface IPost {
  id: number
  title: string
  content: string
  author: string
  createAt: string
  thumbnail: string
  tag: string
  totalComment: number
  totalLikes: number
  avatar: string
}

export interface IPostResponse {
  status: string
  message: string
  data: IPost
}
