export interface Doctor {
  username: string
  name: string
  email: string
  phone: string
  address: string
  dob: string
  specialization: string
  role: string
}

export interface IDoctorResponse {
  data: Doctor
  message: string
}
