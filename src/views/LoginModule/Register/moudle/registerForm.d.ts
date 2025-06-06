// 注册表单
export type registerFormData = {
  username: string
  avatarUrl: string
  password: string
  phone: string
  phoneVerifyCode: string
  whatsApp: string
  whatsAppVerifyCode: string
  email: string
  emailVerifyCode: string
  nricOrFin: string
  nricOrFinType: number
  passUrl: string
  schoolName: string
  studentPassExpiryDate: string
  studentCardUrl: string
  positions: [number]
  employmentType: number
  hygieneCertificate: number
  hygieneCertificateUrl: string
  payWay: number
  gender: number
  birthDate: string
  race: number
  nationality: number
  religion: number
  height: number
  weight: number
  uniformSize: number
  maritalStatus: number
  firstLanguage: number
  secondLanguage: number
  postcode: number
  address: string
  bankName: string
  accountNumber: number
  emergencyContacts: EmergencyContact[]
  education: Education
  employHistory: EmployHistory[]
}
// 紧急联系人类型
export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  address: string
}

// 教育背景类型
export interface Education {
  highest: string
  period: string
  school: string
}

// 工作经历类型
export interface EmployHistory {
  period: string
  employer: string
  position: string
  leaveReason: string
}
