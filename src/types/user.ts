export interface User {
  username: string
  password: string
  role: string
}

export interface UserResponse {
  data: User
  message: string
}
