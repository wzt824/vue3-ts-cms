<template>
  <div class="login-account-wrap">
    <el-form label-width="55px" :rules="accountRules" :model="account" ref="ruleForm" class="login-account-ruleForm">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" maxlength="10"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore} from 'vuex'
import { accountRules } from '../config/rules-config'
import localCache from '@/utils/cache'
export default defineComponent({
  setup () {
    const account = reactive({
      name: localCache.getCache('name'),
      password: localCache.getCache('password')
    })
    const ruleForm = ref<InstanceType<typeof ElForm>>()
    // 获取vuex store对象
    const store = useStore()

    const loginAction = (isKeepPassword: boolean) => {
      ruleForm.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存账号和密码
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            // 清空本地账号和密码的缓存
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 2. 执行登录操作
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      accountRules,
      ruleForm,
      loginAction
    }
  }
})
</script>

<style scoped lang='less'>
.login-account-wrap{
  .login-account-ruleForm{
    margin-top: 22px;
  }
}
</style>
