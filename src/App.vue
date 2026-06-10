<script setup lang="ts">
import DemoPanel from './components/DemoPanel.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SideBar />
    <div class="flex-1 overflow-hidden">
      <DemoPanel />
    </div>
  </div>
</template>
