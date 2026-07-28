import { LIBRARIES } from '@/constants/libraries'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/vue-transition' },
    ...LIBRARIES.map((lib) => ({
      path: lib.path,
      name: lib.name,
      component: lib.component,
      meta: { libraryId: lib.id },
    })),
    ...LIBRARIES.map((lib) => ({
      path: `/embed${lib.path}`,
      name: `${lib.id}-embed`,
      component: lib.component,
      meta: { libraryId: lib.id, embed: true },
    })),
  ] as RouteRecordRaw[],
})

export default router
