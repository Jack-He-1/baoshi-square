import { defineStore } from 'pinia'
import type { EmergencyContact, registerFormData } from '@/views/LoginModule/Register/moudle/registerForm'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    // 表单数据
    formData: {
      username: '',
      avatarUrl: '',
      password: '',
      phone: '',
      phoneVerifyCode: '',
      whatsApp: '',
      whatsAppVerifyCode: '',
      email: '',
      emailVerifyCode: '',
      nricOrFin: '',
      nricOrFinType: 0,
      passUrl: '',
      schoolName: '',
      studentPassExpiryDate: '',
      studentCardUrl: '',
      positions: [0],
      employmentType: 0,
      hygieneCertificate: 0,
      hygieneCertificateUrl: '',
      payWay: 0,
      gender: 0,
      birthDate: '',
      race: 0,
      nationality: 0,
      religion: 0,
      height: 0,
      weight: 0,
      uniformSize: 0,
      maritalStatus: 0,
      firstLanguage: 0,
      secondLanguage: 0,
      postcode: 0,
      address: '',
      bankName: '',
      accountNumber: 0,
      emergencyContacts: [],
      education: {
        highest: '',
        period: '',
        school: ''
      },
      employHistory: []
    } as registerFormData,

    // 状态管理
    currentStep: 1,
    totalSteps: 5,
    isLoading: false,
    errors: {} as Record<string, string>,
    isSubmitted: false
  }),

  getters: {
    // 表单验证状态
    isFormValid(): boolean {
      return !!(this.formData.username && this.formData.email && this.formData.password)
    },

    // 当前步骤完成度
    stepProgress(): number {
      return (this.currentStep / this.totalSteps) * 100
    },

    // 是否可以提交
    canSubmit(): boolean {
      return this.isFormValid && !this.isLoading
    },

    // 紧急联系人数量
    emergencyContactsCount(): number {
      return this.formData.emergencyContacts.length
    }
  },

  actions: {
    // 更新表单数据
    updateFormData(data: Partial<registerFormData>) {
      this.formData = { ...this.formData, ...data }
    },

    // 更新特定字段
    updateField<K extends keyof registerFormData>(
      field: K,
      value: registerFormData[K]
    ) {
      this.formData[field] = value
    },

    // 添加紧急联系人
    addEmergencyContact(contact: EmergencyContact) {
      this.formData.emergencyContacts.push(contact)
    },

    // 删除紧急联系人
    removeEmergencyContact(index: number) {
      this.formData.emergencyContacts.splice(index, 1)
    },

    // 设置错误信息
    setError(field: string, message: string) {
      this.errors[field] = message
    },

    // 清除错误信息
    clearError(field: string) {
      delete this.errors[field]
    },

    // 下一步
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },

    // 上一步
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    // 重置表单
    resetForm() {
      this.$reset()
    },

    // 提交表单
    async submitForm() {
      this.isLoading = true
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData)
        })

        if (response.ok) {
          this.isSubmitted = true
          return await response.json()
        } else {
          throw new Error('Registration failed')
        }
      } catch (error) {
        console.error('Submit error:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 保存草稿到本地存储
    saveDraft() {
      localStorage.setItem('registerDraft', JSON.stringify(this.formData))
    },

    // 加载草稿
    loadDraft() {
      const draft = localStorage.getItem('registerDraft')
      if (draft) {
        this.formData = JSON.parse(draft)
      }
    }
  }
})
