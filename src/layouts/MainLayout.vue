<script setup lang="ts">
import '@lottiefiles/lottie-player'
import type { LottiePlayer } from '@lottiefiles/lottie-player'
//路由相关
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'
//用户信息
const store = useUserStore()
const userType = ref(store.user?.userType)
// Lottie配置项
type TabItem = {
  path: string
  icon: string
  label: string
}

const currentTabs = computed(() => userType.value === 'full' ? fullTabs : tabs)

//兼职
const tabs: TabItem[] = [
  { path: '/home', icon: 'home.json', label: 'Jobs' },
  { path: '/my-works', icon: 'work.json', label: 'My Works' },
  { path: '/wallet', icon: 'wallet.json', label: 'Wallet' },
  { path: '/incentive', icon: 'incentive.json', label: 'Incentive' },
  { path: '/me', icon: 'me.json', label: 'Me' }
]
//全职
const fullTabs: TabItem[] = [
  { path: '/my-works/full-time', icon: 'work.json', label: 'My Works' },
  { path: '/working-hours', icon: 'working_hours.json', label: 'Working Hours' },
  { path: '/me', icon: 'me.json', label: 'Me' }
]
// 添加图标预加载逻辑
onMounted(() => {
  [tabs, fullTabs].flat().forEach(tab => {
    new Image().src = `/src/assets/lottie/tabbar/${tab.icon}`
  })
})

// Lottie控制逻辑
const lottieRefs = ref<{ [key: string]: LottiePlayer | null }>({})
const activeAnimations = ref<Set<string>>(new Set())

const route = useRoute()
// 通用点击处理
const handleTabClick = (path: string) => {
  if (route.path === path) return

  const anim = lottieRefs.value[path]
  if (anim && !activeAnimations.value.has(path)) {
    activeAnimations.value.add(path)
    anim.play()

    anim.addEventListener('complete', () => {
      anim.stop()
      activeAnimations.value.delete(path)
    }, { once: true })
  }
}

const hidePaths = ['/login', '/register'] // 需要隐藏导航的路径


</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <van-tabbar v-if="!hidePaths.includes(route.path)" route>
    <van-tabbar-item
      v-for="tab in currentTabs"
      :key="`${userType}-${tab.path}`"
      :to="tab.path"
      @click="handleTabClick(tab.path)"
      style="text-align: center"
    >
      <template v-if="tab.icon.endsWith('.json')">
        <lottie-player
          :ref="(el: any) => lottieRefs[tab.path] = el as LottiePlayer"
          :autoplay="false"
          :loop="false"
          speed="1.4"
          :src="`/src/assets/lottie/tabbar/${tab.icon}`"
          style="width: 30px; height: 30px;margin: auto"
          class="tab-icon"
          :class="{ inactive: route.path !== tab.path }"
        />
      </template>
      {{ tab.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss">
.tab-icon {
  width: 30px;
  height: 30px;
  transition: filter 1s ease;
  &.inactive {
    filter: grayscale(100%) brightness(0.6) opacity(0.8);
  }
}

</style>

