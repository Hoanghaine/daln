export interface Ipatient {
  username: string
  name: string
  email: string
  phone: number
  address: string
  dob: string
  imageUrl: string
}

export interface IUserResponse {
  message: string
  data: Ipatient
}
