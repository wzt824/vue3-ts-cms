<template>
  <div class="nav-menu-wrap">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo"/>
      <span v-show="!collapse" class="title">vue3TsAdmin</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      unique-opened
      :collapse = "collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd">
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 二级菜单 -->
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    // 计算属性
    const userMenus = computed(() => store.state.login.userMenus)
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultActive = menu.id

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? 'not-found'
      })
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultActive
    }
  }
})
</script>

<style scoped lang='less'>
.nav-menu-wrap {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 20px;
    padding: 12px 10px 8px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img{
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
