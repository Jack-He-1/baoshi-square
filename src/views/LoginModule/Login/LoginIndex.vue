<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 引入路由功能
import { useUserStore } from '@/stores/user.ts'
  //用户信息
  const store = useUserStore()

  //tab手机/邮箱状态  手机0 邮箱1
  const active = ref<number>(0)
  //手机号
  const phone = ref<string>('');
  //邮箱
  const email = ref<string>('');
  //密码
  const password = ref<string>('');
  //登录（表单提交）
  const router = useRouter() // 初始化路由实例
  const onSubmit = () => {
    store.setUser({userType: 'part'})
    if (store.user?.userType == 'part'){
      // 登录成功后跳转
      router.push({
        path: '/home', // 目标路由路径
        query: {
          // from: 'login' // 可选参数
        }
      })
    }
  };
  const onSubmitFull = () => {
    store.setUser({userType: 'full'})
    if (store.user?.userType == 'full'){
      // 登录成功后跳转
      router.push({
        path: '/my-works/full-time', // 目标路由路径
        query: {
          // from: 'login' // 可选参数
        }
      })
    }
  };
  //区号选择器弹窗
  const showPicker = ref<boolean>(false);
  //区号选择器数据
  const areaCode = ref<string>('65');
  //区号选择器选中值
  const pickerValue = ref<string[]>([]);
  // 定义区号选项的类型
  interface AreaCodeOption {
    text: string;
    value: string;
  }

  interface PickerConfirmEvent {
    selectedValues: string[];
    selectedOptions: AreaCodeOption[];
  }
  // 区号选择器数据
  const areaCodes = ref([
    { text: 'China (+86)', value: '86' },
    { text: 'United States of America (+1)', value: '1' },
    { text: 'Singaporean (+65)', value: '65' }
  ]);
  // 区号选择器确认事件
  const onConfirm = ({ selectedValues, selectedOptions }: PickerConfirmEvent) => {
    areaCode.value = selectedOptions[0]?.value;
    pickerValue.value = selectedValues;
    showPicker.value = false;
  };
  // 密码显隐
  const passwordStatus = ref<boolean>(false);



</script>

<template>
  <div class="login-container">
    <span class="login-title">Login</span>
    <div class="login-form">
<!--      登录方式tab-->
      <van-tabs v-model:active="active" type="card" animated class="login-tabs gray_theme_c_tabs">
        <van-tab v-for="(tab, index) in ['Phone', 'Email']" :key="index" class="gray_theme_c_tab">
          <template #title>
            <van-icon :name="index == 0  ? 'phone-o' : 'envelop-o' " />{{ tab }}
          </template>
        </van-tab>
      </van-tabs>
<!--      手机号/邮箱/密码TODO-->
      <van-form @submit="onSubmit" class="login-form-box">
        <van-cell-group inset class="login-form-content">
              <div class="login-phone-title" v-if="active == 0">Phone</div>
              <div class="login-phone" v-if="active == 0">
                <van-field
                  v-model="areaCode"
                  right-icon="arrow-down"
                  readonly
                  @click="showPicker = true"
                  class="login-area-code"
                />
                <van-field
                  v-model="phone"
                  left-icon="phone-o"
                  placeholder="Phone"
                  :rules="[{ required: true }]"
                  class="login-phone-input"
                />
              </div>
              <div class="login-phone-title" v-if="active == 1">Email address</div>
              <van-field
                v-if="active == 1"
                v-model="email"
                left-icon="envelop-o"
                placeholder="Email"
                class="login-password-input login-phone-password"
                :rules="[{ required: true }]"
              />
              <div class="login-phone-password-title">Password</div>
                <van-field
                  v-model="password"
                  left-icon="src/assets/images/login/svg/icons8_padlock.svg"
                  :type="!passwordStatus? 'password' : 'text'"
                  placeholder="password"
                  @click-right-icon="passwordStatus = !passwordStatus"
                  :right-icon="!passwordStatus? 'closed-eye' : 'eye-o' "
                  :rules="[{ required: true}]"
                  class="login-password-input login-phone-password"
                />
        </van-cell-group>
<!--        忘记密码TODO-->
        <van-row>
          <van-col class="text-gray-gl text-13-font-gl" offset="15">Forget password?</van-col>
        </van-row>
<!--        隐私协议/登录TODO-->
        <van-row class="margin-top-40-gl" :gutter="[0, 8]">
          <van-col offset="2" span="24">
            <div class="terms-text">I have read and agree
              <span class="text-primary-gl">
                《Terms of Service》
              </span>
            </div>
          </van-col>
          <van-col offset="2" span="20">
            <van-button class="login-button-go" type="primary" loading-text="loading" loading-size="22px" @click="onSubmit">Login</van-button>
          </van-col>
        </van-row>
<!--        注册/进入主页TODO-->
        <van-row  class="margin-top-20-gl">
          <van-col offset="2" span="13">
            <div class="text-primary-gl">Register</div>
          </van-col>
          <van-col>
            <div class="text-primary-gl">Join as Guest</div>
          </van-col>
        </van-row>
<!--        三方登录TODO-->
        <van-row class="margin-top-20-gl" justify="center">
          <van-col span="21">
            <van-divider class="other-login">one-tap login</van-divider>
          </van-col>
          <van-col offset="1" span="4" class="other-login-img">
            <van-image width="40" height="40" src="src/assets/images/login/facebook.png"/>
          </van-col>
          <van-col span="4" class="other-login-img">
            <van-image width="30" height="30" src="src/assets/images/login/google.png"/>
          </van-col>
          <van-col span="4" class="other-login-img">
            <van-image width="40" height="40" src="src/assets/images/login/face_id.png"/>
          </van-col>
        </van-row>

<!--          TODO模拟全兼职登录-->
        <van-button @click="onSubmitFull">Login FUll</van-button>
      </van-form>

    </div>
  </div>
  <!-- 区号选择弹窗 -->
  <van-popup v-model:show="showPicker"  destroy-on-close position="bottom">
    <van-picker
      title="Select Area Code"
      :columns="areaCodes"
      :model-value="pickerValue"
      @confirm="onConfirm"
      @cancel="showPicker = false"
      confirm-button-text="confirm"
      cancel-button-text="cancel"
    />
  </van-popup>
</template>
<style scoped lang="scss">
@use 'index';
@use '@/styles/vanTabs';



</style>
