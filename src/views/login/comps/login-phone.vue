<template>
  <div class="login-phone-wrap">
    <el-form :rules="phoneRules" :model="phone" ref="ruleForm" label-width="70px" class="login-phone-ruleForm">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" maxlength="6"></el-input>
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { phoneRules } from '../config/rules-config'
import localCache from '@/utils/cache'
export default defineComponent({
  setup () {
    const store = useStore()
    const phone = reactive({
      number: localCache.getCache('phone'),
      code: ''
    })

    const ruleForm = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      ruleForm.value?.validate((valid) => {
        if (valid) {
          // 1.本地保存手机号
          if (isKeepPassword) {
            localCache.setCache('phone', phone.number)
          } else {
            localCache.deleteCache('phone')
          }

          // 2.执行登录操作
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      phone,
      phoneRules,
      loginAction,
      ruleForm
    }
  }
})
</script>

<style scoped lang='less'>
.login-phone-wrap{
  .login-phone-ruleForm{
    margin-top: 22px;
    .get-code{
      display: flex;
      align-items: center;
      .code-btn{
        margin-left: 8px;
      }
    }
  }
}
</style>
