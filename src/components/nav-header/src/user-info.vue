<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span class="title">{{name}}</span>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleLogoutClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-s-custom">用户信息</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-setting">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import localCache from '@/utils/cache'
export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)
    const handleLogoutClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleLogoutClick
    }
  }
})
</script>

<style scoped lang='less'>
.user-info {
  .el-dropdown-link{
    display: flex;
    align-items: center;

    .title {
      margin-left: 5px;
    }
  }
}
</style>
