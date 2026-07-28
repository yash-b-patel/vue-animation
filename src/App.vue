<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DemoPanel from './components/DemoPanel.vue'
import SideBar from './components/SideBar.vue'

const route = useRoute()
const isEmbedRoute = computed(() => route.meta.embed === true)
</script>

<template>
  <div v-if="isEmbedRoute" class="h-screen overflow-hidden">
    <RouterView />
  </div>

  <div v-else class="flex h-screen overflow-hidden">
    <SideBar />
    <div class="flex-1 overflow-hidden">
      <DemoPanel />
    </div>
  </div>
</template>
