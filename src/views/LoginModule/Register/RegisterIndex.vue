<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '@/stores/registerForm.ts'
import { onMounted, watch } from 'vue'
import { showFailToast, showSuccessToast, type UploaderFileListItem } from 'vant'
// 使用 store
const registerStore = useRegisterStore()

// 解构响应式数据
const {
  formData, //表单数据
  currentStep, //当前进度
  totalSteps, //总进度
  isLoading,
  errors,
  canSubmit,
  dictOptions, //字典数据
  showOptions, //字典展示开关
  selections, //选中值列表
  viewsData, //显示值列表
} = storeToRefs(registerStore)

// 解构方法
const {
  clearError,
  nextStep, //下一步
  prevStep, //上一步
  submitForm, //提交信息
  saveDraft, //保存草稿
  UploadFile, //上传文件
  onConfirm, //选择确认事件
  onStudentDateConfirm, //学生证日期确认事件
  onBirthDateConfirm,//生日日期确认事件
  onPhoneAreaConfirm,//手机区号确认事件
} = registerStore

// 提交处理
const handleSubmit = async () => {
  try {
    await submitForm()
    // 提交成功后的处理
    showSuccessToast('注册成功!')
  } catch {
    showFailToast('注册失败，请重试')
  }
}

// 自动保存草稿
watch(
  [formData, viewsData],
  () => {
    saveDraft()
  },
  { deep: true },
)

// 页面加载时恢复草稿
onMounted(() => {
  registerStore.loadDraft()
})
</script>

<template>
  <div class="register-bg">
    <van-steps :active="currentStep - 1" :count="totalSteps" class="register-steps">
      <van-step>Basic Info</van-step>
      <van-step>Bank Info</van-step>
      <van-step>Contacts</van-step>
      <van-step>Work Info</van-step>
    </van-steps>
    <van-form class="register-form" required="auto">
      <!-- 步骤1: 基本信息 -->
      <div v-if="currentStep === 1">
        <div class="text-24-font-gl">Basic Information</div>
        <van-cell-group inset class="card-medium-shadow register-cell-group">
          <!--          姓名-->
          <van-field
            label-align="top"
            v-model="formData.username"
            label="Full Name(Same as IC)"
            placeholder="Please enter full name(Same as IC)"
            :error-message="errors.username"
            @input="clearError('username')"
          />
          <!--          照片-->
          <van-field name="uploader" label="Passport Photo" label-align="top">
            <template #input>
              <van-uploader
                :max-count="1"
                :after-read="
                  (fileItem) => {
                    if (fileItem) {
                      UploadFile(fileItem as UploaderFileListItem, 1)
                    }
                  }
                "
              />
            </template>
          </van-field>
          <!--          身份证号-->
          <van-field
            label-align="top"
            v-model="formData.nricOrFin"
            label="NRIC/FIN"
            placeholder="Please enter NRIC/FIN"
            :error-message="errors.nricOrFin"
            @input="clearError('nricOrFin')"
          />
          <!--          证件类型-->
          <van-field
            label-align="top"
            v-model="viewsData.FINText"
            label="NRIC/FIN Type"
            is-link
            readonly
            name="picker"
            placeholder="Please Select NRIC/FIN Type"
            @click="showOptions.showFINType = true"
          />
          <van-popup v-model:show="showOptions.showFINType" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.FInOptions"
              :model-value="selections.FInTypeValue"
              @confirm="(args) => onConfirm(args, 1)"
              @cancel="showOptions.showFINType = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
          <!--          学生/PR/新加坡公民-->
          <van-field
            v-if="formData.nricOrFinType == 1"
            label-align="top"
            v-model="formData.schoolName"
            label="School Name"
            is-link
            readonly
            name="picker"
            placeholder="Please Select school"
            @click="showOptions.showSchoolName = true"
          />
          <!--          学校名称列表-->
          <van-popup v-model:show="showOptions.showSchoolName" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.schoolNameOptions"
              :model-value="selections.schoolNameValue"
              @confirm="(args) => onConfirm(args, 2)"
              @cancel="showOptions.showSchoolName = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
          <!--          学生证到期时间-->
          <van-field
            v-if="formData.nricOrFinType == 1"
            label-align="top"
            v-model="formData.studentPassExpiryDate"
            is-link
            readonly
            name="calendar"
            label="Student Pass Expiry Date"
            placeholder="Please select pass validity"
            @click="showOptions.showStudentExpiryDate = true"
          />
          <van-calendar
            switch-mode="year-month"
            v-model:show="showOptions.showStudentExpiryDate"
            title="Date Selection"
            :show-confirm="false"
            @confirm="onStudentDateConfirm"
          />
          <!--          证件上传-->
          <van-field
            v-if="
              formData.nricOrFinType == 1 ||
              formData.nricOrFinType == 2 ||
              formData.nricOrFinType == 3
            "
            name="uploader"
            :label="formData.nricOrFinType == 1 ? 'Student Pass' : 'IC'"
            label-align="top"
          >
            <template #input>
              <van-uploader
                :max-count="1"
                :after-read="
                  (fileItem) => {
                    if (fileItem) {
                      UploadFile(fileItem as UploaderFileListItem, 1)
                    }
                  }
                "
              >
                <van-button icon="plus" type="primary" class="upload-button">Upload</van-button>
              </van-uploader>
            </template>
          </van-field>
          <!--          学生卡上传-->
          <van-field
            v-if="formData.nricOrFinType == 1"
            name="uploader"
            label="Student Card"
            label-align="top"
          >
            <template #input>
              <van-uploader
                :max-count="1"
                :after-read="
                  (fileItem) => {
                    if (fileItem) {
                      UploadFile(fileItem as UploaderFileListItem, 1)
                    }
                  }
                "
              >
                <van-button icon="plus" type="primary" class="upload-button">Upload</van-button>
              </van-uploader>
            </template>
          </van-field>
        </van-cell-group>
        <div class="text-24-font-gl">Work Information</div>
        <van-cell-group inset class="card-medium-shadow register-cell-group">
          <!--          职位-->
          <van-field name="uploader" label="Positions" label-align="top">
            <template #input>
              <van-checkbox-group
                v-model="formData.positions"
                shape="square"
                direction="horizontal"
                icon-size="16px"
              >
                <van-checkbox
                  v-for="item in dictOptions.positionOptions"
                  :key="item.key"
                  :name="item.value"
                >
                  {{ item.value }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <!--        员工类型  全职/兼职-->
          <van-field
            label-align="top"
            v-model="viewsData.employmentTypeValue"
            label="Worker Type"
            is-link
            readonly
            name="picker"
            placeholder="Please Select Worker Type"
            @click="showOptions.showEmploymentType = true"
          />
          <van-popup
            v-model:show="showOptions.showEmploymentType"
            destroy-on-close
            position="bottom"
          >
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.emptypeOptions"
              :model-value="selections.employmentTypeValue"
              @confirm="(args) => onConfirm(args, 3)"
              @cancel="showOptions.showEmploymentType = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
          <!--          健康证-->
          <van-field
            label-align="top"
            v-model="viewsData.hygieneCertificateValue"
            label="Hygiene Cert"
            is-link
            readonly
            name="picker"
            placeholder="Please Select Hygiene Cert"
            @click="showOptions.showHygieneCertificate = true"
          />
          <van-popup
            v-model:show="showOptions.showHygieneCertificate"
            destroy-on-close
            position="bottom"
          >
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.hygieneCertificateOptions"
              :model-value="selections.hygieneCertificateValue"
              @confirm="(args) => onConfirm(args, 4)"
              @cancel="showOptions.showHygieneCertificate = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
          <!--          健康证上传-->
          <van-field
            v-if="formData.hygieneCertificate == 1"
            name="uploader"
            label="Hygiene Cert Document"
            label-align="top"
          >
            <template #input>
              <van-uploader
                :max-count="1"
                :after-read="
                  (fileItem) => {
                    if (fileItem) {
                      UploadFile(fileItem as UploaderFileListItem, 1)
                    }
                  }
                "
              >
                <van-button icon="plus" type="primary" class="upload-button">Upload</van-button>
              </van-uploader>
            </template>
          </van-field>
          <!--        支付方式-->
          <van-field
            label-align="top"
            v-model="viewsData.payWayValue"
            label="Payment Types"
            is-link
            readonly
            name="picker"
            placeholder="Please Select Payment way"
            @click="showOptions.showPayWay = true"
          />
          <van-popup v-model:show="showOptions.showPayWay" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.payWayOptions"
              :model-value="selections.payWayValue"
              @confirm="(args) => onConfirm(args, 5)"
              @cancel="showOptions.showPayWay = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
        </van-cell-group>
        <div class="text-24-font-gl">Personal Information</div>
        <van-cell-group inset class="card-medium-shadow register-cell-group">
<!--          性别-->
          <van-field label-align="top" name="radio" label="Gender" >
            <template #input>
              <van-radio-group v-model="formData.gender" direction="horizontal">
                <van-radio v-for="item in dictOptions.genderOptions" :key="item.key" :name="item.value">{{item.value}}</van-radio>
              </van-radio-group>
            </template>
          </van-field>
<!--              出生日期-->
          <van-field
            label-align="top"
            v-model="formData.birthDate"
            is-link
            readonly
            name="calendar"
            label="Birth Date"
            placeholder="Please select birth date"
            @click="showOptions.showBirthDate = true"
          />
          <van-calendar
            switch-mode="year-month"
            v-model:show="showOptions.showBirthDate"
            title="Date Selection"
            :show-confirm="false"
            @confirm="onBirthDateConfirm"
          />
<!--          种族-->
          <van-field
            label-align="top"
            v-model="viewsData.raceText"
            label="Race"
            is-link
            readonly
            name="picker"
            placeholder="Please Select race"
            @click="showOptions.showRace = true"
          />
          <van-popup v-model:show="showOptions.showRace" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.raceOptions"
              :model-value="selections.raceValue"
              @confirm="(args) => onConfirm(args, 6)"
              @cancel="showOptions.showRace = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          国籍-->
          <van-field
            label-align="top"
            v-model="viewsData.nationalityText"
            label="Nationality"
            is-link
            readonly
            name="picker"
            placeholder="Please Select Nationality"
            @click="showOptions.showNationality = true"
          />
          <van-popup v-model:show="showOptions.showNationality" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.nationalityOptions"
              :model-value="selections.nationalityValue"
              @confirm="(args) => onConfirm(args, 7)"
              @cancel="showOptions.showNationality = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          宗教-->
          <van-field
            label-align="top"
            v-model="viewsData.religionText"
            label="Religion"
            is-link
            readonly
            name="picker"
            placeholder="Please Select religion"
            @click="showOptions.showReligion = true"
          />
          <van-popup v-model:show="showOptions.showReligion" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.religionOptions"
              :model-value="selections.religionValue"
              @confirm="(args) => onConfirm(args, 8)"
              @cancel="showOptions.showReligion = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          身高-->
          <van-field
            label-align="top"
            v-model="formData.height"
            label="Height(cm)"
            placeholder="Please enter Height(cm)"
            :error-message="errors.nricOrFin"
            @input="clearError('nricOrFin')"
          >
          <template #button>
            <div>CM</div>
          </template>
          </van-field>
<!--          体重-->
          <van-field
            label-align="top"
            v-model="formData.weight"
            label="Weight(kg)"
            placeholder="Please enter weight(kg)"
            :error-message="errors.nricOrFin"
            @input="clearError('nricOrFin')"
          >
            <template #button>
              <div>KG</div>
            </template>
          </van-field>
<!--          衣服尺寸-->
          <van-field
            label-align="top"
            v-model="viewsData.uniformSizeText"
            label="Uniform Size"
            is-link
            readonly
            name="picker"
            placeholder="Please Select uniform size"
            @click="showOptions.showUniformSize = true"
          />
          <van-popup v-model:show="showOptions.showUniformSize" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.uniformSizeOptions"
              :model-value="selections.uniformSizeValue"
              @confirm="(args) => onConfirm(args, 9)"
              @cancel="showOptions.showUniformSize = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          婚姻状况-->
          <van-field
            label-align="top"
            v-model="viewsData.maritalStatusText"
            label="Marital Status"
            is-link
            readonly
            name="picker"
            placeholder="Please Select marital status"
            @click="showOptions.showMaritalStatus = true"
          />
          <van-popup v-model:show="showOptions.showMaritalStatus" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.maritalStatusOptions"
              :model-value="selections.maritalStatusValue"
              @confirm="(args) => onConfirm(args, 10)"
              @cancel="showOptions.showMaritalStatus = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          第一语言-->
          <van-field
            label-align="top"
            v-model="viewsData.firstLanguageText"
            label="1st Language"
            is-link
            readonly
            name="picker"
            placeholder="Please Select 1st language"
            @click="showOptions.showFirstLanguage = true"
          />
          <van-popup v-model:show="showOptions.showFirstLanguage" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.firstLanguageOptions"
              :model-value="selections.firstLanguageValue"
              @confirm="(args) => onConfirm(args, 11)"
              @cancel="showOptions.showFirstLanguage = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
<!--          第二语言-->
          <van-field
            label-align="top"
            v-model="viewsData.secondLanguageText"
            label="2nd Language"
            is-link
            readonly
            name="picker"
            placeholder="Please Select 2nd Language"
            @click="showOptions.showSecondLanguage = true"
          />
          <van-popup v-model:show="showOptions.showSecondLanguage" destroy-on-close position="bottom">
            <van-picker
              :columns-field-names="{ text: 'value', value: 'key' }"
              :columns="dictOptions.secondLanguageOptions"
              :model-value="selections.secondLanguageValue"
              @confirm="(args) => onConfirm(args, 12)"
              @cancel="showOptions.showSecondLanguage = false"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
            />
          </van-popup>
        </van-cell-group>
        <div class="text-24-font-gl">Contact Information</div>
        <van-cell-group inset class="card-medium-shadow register-cell-group">
          <van-field
            label-align="top"
            v-model="formData.phone"
            label="Handphone"
            placeholder="Please enter Handphone"
            :error-message="errors.nricOrFin"
            @input="clearError('nricOrFin')"
          >
            <template #input>
              <van-field
                v-model="formData.phone"
                placeholder="Please enter Handphone"
                :error-message="errors.nricOrFin"
                @input="clearError('nricOrFin')"
                class="padding-0 area-code"
              >
                <template #label>
                  <van-field
                    v-model="viewsData.areaPhoneCode"
                    right-icon="arrow-down"
                    readonly
                    class="padding-0"
                    @click="showOptions.showPhoneAreaCode = true"
                  />
                  <!-- 区号选择弹窗 -->
                  <van-popup v-model:show="showOptions.showPhoneAreaCode"  destroy-on-close position="bottom">
                    <van-picker
                      :columns-field-names="{text:'value', value:'key'}"
                      title="Select Area Code"
                      :columns="dictOptions.areaCodes"
                      :model-value="selections.areaPhoneCode"
                      @confirm="onPhoneAreaConfirm"
                      @cancel="showOptions.showPhoneAreaCode = false"
                      confirm-button-text="confirm"
                      cancel-button-text="cancel"
                    />
                  </van-popup>
                </template>
              </van-field>
            </template>
          </van-field>
          <van-field
            label-align="top"
            v-model="formData.phone"
            label="Handphone Verification Code"
            placeholder="Handphone Verification Code"
            :error-message="errors.nricOrFin"
            @input="clearError('nricOrFin')"
          >
            <template #button>
              <van-button size="small" type="primary">Get Code</van-button>
            </template>
          </van-field>
        </van-cell-group>





      </div>

      <!-- 步骤2: 联系信息 -->
      <div v-if="currentStep === 2">
        <van-field v-model="formData.phone" label="手机号" />
        <van-field v-model="formData.whatsApp" label="WhatsApp" />
      </div>

      <!-- 步骤导航 -->
      <div>
        <van-button v-if="currentStep > 1" @click="prevStep" plain> Back </van-button>

        <van-button v-if="currentStep < totalSteps" @click="nextStep" type="primary">
          Next
        </van-button>

        <van-button
          v-if="currentStep === totalSteps"
          @click="handleSubmit"
          type="primary"
          :loading="isLoading"
          :disabled="!canSubmit"
        >
          提交注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
@use 'index';
</style>
