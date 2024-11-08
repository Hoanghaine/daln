export interface Ipatient {
  id: number
  username: string
  name: string
  email: string
  phone: string
  address: string
  dob: string
  imageUrl: string
}

export interface IUserResponse {
  message: string
  data: Ipatient
}
