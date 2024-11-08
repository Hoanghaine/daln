export interface IDoctor {
  id: number
  username: string
  email: string
  name: string
  phone: string
  address: string
  dob: string
  degree: string
  specialization: string
  listCertificates: string[]
  experience: string
  imageUrl: string
  about: string
  status: string 
  rating: number
}

export interface IDoctorResponse {
  data: IDoctor
  message: string
}
