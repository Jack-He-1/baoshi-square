import { defineStore } from 'pinia'
import type {
  EmergencyContact,
  registerFormData,
} from '@/views/LoginModule/Register/moudle/registerForm'
import type { UploaderFileListItem } from 'vant'

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
        school: '',
      },
      employHistory: [],
    } as registerFormData,

    // 状态管理
    currentStep: 1,
    totalSteps: 5,
    isLoading: false,
    errors: {} as Record<string, string>,
    isSubmitted: false,
    // 字典列表
    dictOptions: {
      //FIN选项列表
      FInOptions: [
        { key: '1', value: 'Foreign Student' },
        { key: '2', value: 'Singaporean' },
        { key: '3', value: 'PR' },
        { key: '4', value: 'EP' },
        { key: '5', value: 'SP' },
        { key: '6', value: 'WP' },
        { key: '7', value: 'Others' },
      ],
      //学校名称列表
      schoolNameOptions: [
        { key: '1', value: 'Singapore Polytechnic' },
        { key: '2', value: 'Nanyang Polytechnic' },
        { key: '3', value: 'National University of Singapore' },
        { key: '4', value: 'Singapore Management University' },
        { key: '5', value: 'National University of Singapore' },
      ],
      //职位列表
      positionOptions: [
        { key: '1', value: 'Server' },
        { key: '2', value: 'Dishwasher' },
        { key: '3', value: 'Cleaner' },
        { key: '4', value: 'Others' },
      ],
      //emptype列表
      emptypeOptions: [
        { key: '1', value: 'Part Time' },
        { key: '2', value: 'Full Time' },
      ],
      //健康证列表
      hygieneCertificateOptions: [
        { key: '1', value: 'Yes' },
        { key: '2', value: 'No' },
      ],
      //支付方式列表
      payWayOptions: [
        { key: '1', value: 'Daily Pay(Collection from counter)' },
        { key: '2', value: 'Weekly Pay' },
        { key: '3', value: 'Monthly Pay' },
      ],
      //性别列表
      genderOptions: [
        { key: '1', value: 'Male' },
        { key: '2', value: 'Female' },
      ],
      //种族列表
      raceOptions: [
        { key: '1', value: 'Chinese' },
        { key: '2', value: 'Malay' },
        { key: '3', value: 'Indian' },
        { key: '4', value: 'Others' },
      ],
      //国籍列表
      nationalityOptions: [
        { key: '1', value: 'Singapore' },
        { key: '2', value: 'Malaysia' },
        { key: '3', value: 'Indonesia' },
        { key: '4', value: 'Others' },
      ],
      //宗教列表
      religionOptions: [
        { key: '1', value: 'Christian' },
        { key: '2', value: 'Muslim' },
        { key: '3', value: 'Buddhist' },
        { key: '4', value: 'Hindu' },
        { key: '5', value: 'Others' },
      ],
      //衣服尺寸列表
      uniformSizeOptions: [
        { key: '1', value: 'S' },
        { key: '2', value: 'M' },
        { key: '3', value: 'L' },
        { key: '4', value: 'XL' },
        { key: '5', value: '2XL' },
        { key: '6', value: '3XL' },
        { key: '7', value: '4XL' },
        { key: '8', value: '5XL' },
      ],
      //婚姻状态列表
      maritalStatusOptions: [
        { key: '1', value: 'Married' },
        { key: '2', value: 'Single' },
        { key: '3', value: 'Divorced' },
        { key: '4', value: 'Others' },
      ],
      //第一语言列表
      firstLanguageOptions: [
        { key: '1', value: 'English' },
        { key: '2', value: 'Chinese' },
        { key: '3', value: 'Malay' },
        { key: '4', value: 'Indonesian' },
        { key: '5', value: 'Others' },
      ],
      //第二语言列表
      secondLanguageOptions: [
        { key: '1', value: 'English' },
        { key: '2', value: 'Chinese' },
        { key: '3', value: 'Malay' },
        { key: '4', value: 'Indonesian' },
        { key: '5', value: 'Others' },
      ],
      //区号列表
      areaCodes: [
        { key: '+86', value: 'China (+86)' },
        { key: '+1', value: 'United States of America (+1)' },
        { key: '+65', value: 'Singaporean (+65)' },
      ],
    },
    //弹窗状态
    showOptions: {
      //FIN类型弹窗
      showFINType: false,
      //schoolName弹窗
      showSchoolName: false,
      //学生证到期时间弹窗
      showStudentExpiryDate: false,
      //选择全职/兼职弹窗
      showEmploymentType: false,
      //健康证弹窗
      showHygieneCertificate: false,
      //支付方式弹窗
      showPayWay: false,
      //生日弹窗
      showBirthDate: false,
      //种族弹窗
      showRace: false,
      //国籍弹窗
      showNationality: false,
      //宗教弹窗
      showReligion: false,
      //衣服尺寸弹窗
      showUniformSize: false,
      //婚姻状态弹窗
      showMaritalStatus: false,
      //第一语言弹窗
      showFirstLanguage: false,
      //第二语言弹窗
      showSecondLanguage: false,
      //手机区号弹窗
      showPhoneAreaCode: false,
    },
    //选中值列表
    selections: {
      FInTypeValue: [] as string[],
      schoolNameValue: [] as string[],
      employmentTypeValue: [] as string[],
      hygieneCertificateValue: [] as string[],
      payWayValue: [] as string[],
      raceValue: [] as string[],
      nationalityValue: [] as string[],
      religionValue: [] as string[],
      uniformSizeValue: [] as string[],
      maritalStatusValue: [] as string[],
      firstLanguageValue: [] as string[],
      secondLanguageValue: [] as string[],
      areaPhoneCode: [] as string[],
    },
    //显示值列表
    viewsData: {
      FINText: '',
      employmentTypeValue: '',
      hygieneCertificateValue: '',
      payWayValue: '',
      raceText: '',
      nationalityText: '',
      religionText: '',
      uniformSizeText: '',
      maritalStatusText: '',
      firstLanguageText: '',
      secondLanguageText: '',
      areaPhoneCode: '+65',
    },
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
    },
  },

  actions: {
    // 更新表单数据
    updateFormData(data: Partial<registerFormData>) {
      this.formData = { ...this.formData, ...data }
    },

    // 更新特定字段
    updateField<K extends keyof registerFormData>(field: K, value: registerFormData[K]) {
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
    // 文件转换方法
    async convertFileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })
    },
    //选择弹窗确认TODO
    onConfirm(
      {
        selectedValues,
        selectedOptions,
      }: {
        selectedValues: string[]
        selectedOptions: Array<{ key: string; value: string }>
      },
      type: number,
    ) {
      switch (type) {
        case 1: // NRIC/FIN类型选择
          this.formData.nricOrFinType = Number(selectedOptions[0]?.key)
          this.viewsData.FINText = selectedOptions[0]?.value
          this.selections.FInTypeValue = selectedValues
          this.showOptions.showFINType = false
          break
        case 2: // 学校名称选择
          this.formData.schoolName = selectedOptions[0]?.value
          this.selections.schoolNameValue = selectedValues
          this.showOptions.showSchoolName = false
          break
        case 3: //全职/兼职选择
          this.formData.employmentType = Number(selectedOptions[0]?.key)
          this.viewsData.employmentTypeValue = selectedOptions[0]?.value
          this.selections.employmentTypeValue = selectedValues
          this.showOptions.showEmploymentType = false
          break
        case 4: //健康证选择
          this.formData.hygieneCertificate = Number(selectedOptions[0]?.key)
          this.viewsData.hygieneCertificateValue = selectedOptions[0]?.value
          this.selections.hygieneCertificateValue = selectedValues
          this.showOptions.showHygieneCertificate = false
          break
        case 5: //支付方式选择
          this.formData.payWay = Number(selectedOptions[0]?.key)
          this.viewsData.payWayValue = selectedOptions[0]?.value
          this.selections.payWayValue = selectedValues
          this.showOptions.showPayWay = false
          break
        case 6: //种族选择
          this.formData.race = Number(selectedOptions[0]?.key)
          this.viewsData.raceText = selectedOptions[0]?.value
          this.selections.raceValue = selectedValues
          this.showOptions.showRace = false
          break
        case 7: //国籍选择
          this.formData.nationality = Number(selectedOptions[0]?.key)
          this.viewsData.nationalityText = selectedOptions[0]?.value
          this.selections.nationalityValue = selectedValues
          this.showOptions.showNationality = false
          break
        case 8: //宗教选择
          this.formData.religion = Number(selectedOptions[0]?.key)
          this.viewsData.religionText = selectedOptions[0]?.value
          this.selections.religionValue = selectedValues
          this.showOptions.showReligion = false
          break
        case 9: //尺寸选择
          this.formData.uniformSize = Number(selectedOptions[0]?.key)
          this.viewsData.uniformSizeText = selectedOptions[0]?.value
          this.selections.uniformSizeValue = selectedValues
          this.showOptions.showUniformSize = false
          break
        case 10: //婚姻状况选择
          this.formData.maritalStatus = Number(selectedOptions[0]?.key)
          this.viewsData.maritalStatusText = selectedOptions[0]?.value
          this.selections.maritalStatusValue = selectedValues
          this.showOptions.showMaritalStatus = false
          break
        case 11: //第一语言选择
          this.formData.firstLanguage = Number(selectedOptions[0]?.key)
          this.viewsData.firstLanguageText = selectedOptions[0]?.value
          this.selections.firstLanguageValue = selectedValues
          this.showOptions.showFirstLanguage = false
          break
        case 12: //第二语言选择
          this.formData.secondLanguage = Number(selectedOptions[0]?.key)
          this.viewsData.secondLanguageText = selectedOptions[0]?.value
          this.selections.secondLanguageValue = selectedValues
          this.showOptions.showSecondLanguage = false
          break
      }
    },
    //日期格式转换
    formatDate(date: Date) {
      const day = date.getDate().toString().padStart(2, '0') // 天数补零
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份补零
      return `${day}/${month}/${date.getFullYear()}`
    },
    //学生证到期日期弹窗确认
    onStudentDateConfirm(date: Date) {
      this.formData.studentPassExpiryDate = this.formatDate(date)
      this.showOptions.showStudentExpiryDate = false
    },
    //生日弹窗确认
    onBirthDateConfirm(date: Date) {
      this.formData.birthDate = this.formatDate(date)
      this.showOptions.showBirthDate = false
    },
    //上传图片TODO
    async UploadFile(fileItem: UploaderFileListItem, type: number) {
      try {
        if (!fileItem.file) {
          throw new Error('无效的文件对象')
        }

        // 转换文件为Base64
        const base64Content = await this.convertFileToBase64(fileItem.file)

        // 构建符合后端要求的参数
        const payload = {
          fileContent: base64Content.split(',')[1], // 去除data:前缀
          fileName: fileItem.file.name,
          type: type,
        }
        console.log(payload)
        // 调用后端API示例
        // const response = await fetch('/api/upload', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payload)
        // })

        // 处理响应...
      } catch (error) {
        console.error('文件上传失败:', error)
        throw error
      }
    },
    onPhoneAreaConfirm({
      selectedValues,
      selectedOptions,
    }: {
      selectedValues: string[]
      selectedOptions: Array<{ key: string; value: string }>
    }) {
      this.viewsData.areaPhoneCode = selectedOptions[0]?.key
      this.selections.areaPhoneCode = selectedValues
      this.showOptions.showPhoneAreaCode = false
    },

    // 提交表单
    async submitForm() {
      this.isLoading = true
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData),
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
      localStorage.setItem('registerViewDraft', JSON.stringify(this.viewsData))
    },

    // 加载草稿
    loadDraft() {
      const draft = localStorage.getItem('registerDraft')
      const viewDraft = localStorage.getItem('registerViewDraft')
      if (draft) {
        this.formData = JSON.parse(draft)
      }
      if (viewDraft) {
        this.viewsData = JSON.parse(viewDraft)
      }
    },
  },
})
