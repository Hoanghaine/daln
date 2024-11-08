export interface IUser {
  id: number
  username: string
  password: string
  role: string
}

export interface IUserResponse {
  data: IUser
  message: string
}
