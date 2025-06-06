<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '@/stores/registerForm.ts'
import { onMounted, watch } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
// 使用 store
const registerStore = useRegisterStore()

// 解构响应式数据
const {
  formData,
  currentStep,
  totalSteps,
  isLoading,
  errors,
  canSubmit
} = storeToRefs(registerStore)

// 解构方法
const {
  clearError,
  nextStep,
  prevStep,
  submitForm,
  saveDraft
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
watch(formData, () => {
  saveDraft()
}, { deep: true })

// 页面加载时恢复草稿
onMounted(() => {
  registerStore.loadDraft()
})



</script>

<template>
  <div class="register-bg">
<!--    <van-form>-->
<!--      <div class="text-24-font-gl margin-left-10-gl">Basic Information</div>-->
<!--      <van-cell-group inset class="card-medium-shadow">-->

<!--        <van-field>-->

<!--        </van-field>-->
<!--      </van-cell-group>-->
<!--    </van-form>-->
    <van-steps :active="currentStep - 1" :count="totalSteps" active-color="#07c160">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
<!--    <van-steps active-color="red" :active="currentStep - 1" :count="totalSteps" />-->
    <div class="register-form">

      <!-- 步骤1: 基本信息 -->
      <div v-if="currentStep === 1">
        <van-field
          v-model="formData.username"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="errors.username"
          @input="clearError('username')"
        />
        <van-field
          v-model="formData.email"
          label="邮箱"
          placeholder="请输入邮箱"
          :error-message="errors.email"
          @input="clearError('email')"
        />
      </div>

      <!-- 步骤2: 联系信息 -->
      <div v-if="currentStep === 2">
        <van-field v-model="formData.phone" label="手机号" />
        <van-field v-model="formData.whatsApp" label="WhatsApp" />
      </div>

      <!-- 步骤导航 -->
      <div class="step-actions">
        <van-button
          v-if="currentStep > 1"
          @click="prevStep"
          plain
        >
          上一步
        </van-button>

        <van-button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          type="primary"
        >
          下一步
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
    </div>


  </div>
</template>

<style scoped lang="scss">
  @use "index";
</style>
