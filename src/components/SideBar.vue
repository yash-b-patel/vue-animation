<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LIBRARIES } from '@/constants/libraries'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

<template>
  <aside
    class="flex h-screen w-57.5 min-w-57.5 flex-col overflow-y-auto border-r border-gray-200 bg-white"
  >
    <div class="flex items-center gap-2.5 border-b border-gray-200 px-4 pt-5 pb-4">
      <span class="text-[22px] leading-none">⚡</span>
      <div>
        <p class="text-sm leading-[1.3] font-semibold text-gray-950">Vue Animations</p>
        <p class="mt-0.5 text-[11px] leading-none text-gray-400">
          {{ LIBRARIES.length }} libraries
        </p>
      </div>
    </div>

    <nav class="flex-1 py-2">
      <RouterLink
        v-for="(lib, index) in LIBRARIES"
        :key="lib.id"
        :to="lib.path"
        class="flex cursor-pointer items-center gap-2.5 border-l-2 px-4 py-2.5 no-underline transition-colors duration-150"
        :class="
          currentRoute === lib.path
            ? 'border-blue-500 bg-sky-50'
            : 'border-transparent hover:bg-gray-50'
        "
      >
        <span
          class="min-w-5 text-[11px] font-medium tabular-nums"
          :class="currentRoute === lib.path ? 'text-blue-500' : 'text-gray-300'"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div class="flex flex-1 flex-col gap-0.5">
          <span
            class="text-[13px] leading-[1.2] font-medium"
            :class="currentRoute === lib.path ? 'text-blue-700' : 'text-gray-700'"
          >
            {{ lib.name }}
          </span>
          <span class="text-[11px] text-gray-400">{{ lib.category }}</span>
        </div>
        <span
          v-if="lib.npm === null"
          class="rounded-full border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600"
        >
          built-in
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>
