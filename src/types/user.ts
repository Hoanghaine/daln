export interface IUser {
  id: number
  username: string
  password: string
  role: string
  status: string
}

export interface IUserRegister {
  username: string
  password: string
  name: string
  email: string
  phone: string
  dob: string
  address: string
  specialization?: string
  role: string
  experienceYears?: number
}