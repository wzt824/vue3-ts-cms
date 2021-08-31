import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

// 第一个菜单
let firstMenu: any = null

// 对menus映射到路由里
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[]{
  const routes: RouteRecordRaw[] = []
  // 1. 加载所有的路由
  const allRoutes: RouteRecordRaw[] = []
  // node 里的模块
  const routerFiles = require.context('../router/main', true, /\.ts/)
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2. 根据后台返回的数据过滤添加
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 保存第一个菜单
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 获取一级和二级菜单，用于面包屑
export function pathMapBreadcrumbs (userMenus: any[], currentPath: string): any[] {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 通过路径匹配菜单：递归实现
export function pathMapToMenu (userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath){
      return menu
    }
  }
}

// 获取用户按钮权限
export function mapMenusToPermission (userMenus: any[]): any[]  {
  const permissions: string[] = []

  // 递归遍历
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        // 若是不存在menu.children则传入空数组
        _recurseGetPermission(menu.children ?? [])
      } else if ( menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 获取菜单里的所有叶子节点
export function mapMenuLeafKeys (menuList: any[]) {
  const leafKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leafKeys
}

// 导出第一个菜单
export { firstMenu }
