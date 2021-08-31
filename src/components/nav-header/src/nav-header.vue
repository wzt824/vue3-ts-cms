<template>
  <div class="nav-header-wrap">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick">
    </i>
    <div class="content-wrap">
      <zt-breadcrumb :breadcrumbs="breadcrumbs" />
      <div class="info-wrap">
        <news-info class="info-item" />
        <collection-info class="info-item" />
        <notice-info class="info-item" />
        <user-info class="info-item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import UserInfo from './user-info.vue'
import NewsInfo from './news-info.vue'
import NoticeInfo from './notice-info.vue'
import CollectionInfo from './collection-info.vue'
import ZtBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    UserInfo,
    NewsInfo,
    NoticeInfo,
    CollectionInfo,
    ZtBreadcrumb
  },
  emits: ['foldChange'],
  setup (props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 获取vuex中的数据
    const store = useStore()
    // 面包屑数据：使用计算属性的目的在于只要发生变化就重新计算
    const breadcrumbs = computed(() => {
      // 获取vuex中的数据
      const userMenus = store.state.login.userMenus
      // 获取当前路径
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang='less'>
.nav-header-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .fold-menu{
    font-size: 30px;
    margin-right: 15px;
    cursor: pointer;
  }
  .content-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-wrap {
      display: flex;
      align-items: center;
      .info-item {
        margin-left: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
