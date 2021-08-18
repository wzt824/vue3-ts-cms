<template>
  <div class="login-warp">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPanel from './comps/login-panel.vue'
export default defineComponent({
  components:{
    LoginPanel
  },
  setup () {
    const message = ref('登录页面')
    return {
      message
    }
  }
})
</script>

<style scoped lang='less'>
.login-warp{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
