export interface IDoctor {
  id: number
  username: string
  name: string
  email: string
  address: string
  phone: string
  dob: string
  role: string
  avatar: string
  createdDate: string
  lastModifiedDate: string
  certificates: string[]
  specialization: string
  about: string
  degree: string
  avgRating: number
  experience: number
  status: string
}
export interface IDoctorDetailResponse {
  data: IDoctor
  message: string
}

export interface IDoctorsBasicInfor {
  id: number
  name: string
  avatar: string
  specialization: string
  avgRating: number
}
