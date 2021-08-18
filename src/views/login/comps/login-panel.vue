<template>
  <div class="login-panel-warp">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup () {
    // 定义属性
    const isKeepPassword = ref(false)
    // InstanceType 获取 构造函数 的返回类型，如果是多个就以 联合类型 的方式返回
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 定义方法
    const handleLoginClick = () => {
      // 判断登录类型
      if(currentTab.value === 'account'){
        // 调用子组件数据
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 调用子组件数据
        phoneRef.value?.loginAction(isKeepPassword.value)
      }
    }

    const handleTabClick = (targetName: any) => {
      console.log(targetName)
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      handleTabClick,
      currentTab
    }
  }
})
</script>

<style scoped lang='less'>
.login-panel-warp {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
    font-family: cursive;
  }
  .account-control{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
