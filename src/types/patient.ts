export interface Ipatient {
  id: number
  name: string
  email: string
  address: string
  phone: string
  dob: string
  avatar: string
}

export interface IPatientDetailResponse {
  data: Ipatient
  message: string
}
