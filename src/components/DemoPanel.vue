<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getLibraryByRoute } from '@/constants/libraries'

const route = useRoute()
const codeOpen = ref(false)

const library = computed(() => getLibraryByRoute(route.path))
</script>

<template>
  <div v-if="library" class="flex h-screen flex-col overflow-hidden">
    <!-- Header -->
    <header class="shrink-0 border-b border-gray-200 bg-white px-8 pt-6 pb-5">
      <div>
        <div class="mb-2.5 flex items-center gap-2">
          <span
            class="rounded-full border border-blue-200 bg-blue-50 px-2.25 py-0.75 text-[11px] font-medium text-blue-600"
          >
            {{ library.category }}
          </span>
          <span
            class="rounded-full border border-gray-200 bg-gray-100 px-2.25 py-0.75 font-mono text-[11px] font-medium text-gray-500"
          >
            v{{ library.version }}
          </span>
          <span
            v-if="library.npm"
            class="rounded-full border border-purple-200 bg-pink-50 px-2.25 py-0.75 font-mono text-[11px] font-medium text-purple-600"
          >
            npm i {{ library.npm }}
          </span>
        </div>
        <h1 class="mb-1.5 text-[22px] leading-[1.2] font-bold text-gray-900">
          {{ library.name }}
        </h1>
        <p class="max-w-150 text-sm leading-6 text-gray-500">{{ library.description }}</p>
      </div>
    </header>

    <!-- Demo area — RouterView loads the actual demo component here -->
    <main class="flex flex-1 items-start justify-center overflow-y-auto bg-gray-50 p-8">
      <RouterView />
    </main>

    <!-- Code footer — collapsed by default, swap slot content per demo -->
    <footer class="shrink-0 border-t border-gray-200 bg-white">
      <button
        class="flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent px-8 py-3 text-left text-[13px] font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        @click="codeOpen = !codeOpen"
      >
        <span>{{ codeOpen ? '▾' : '▸' }}</span>
        Key code snippet
      </button>
      <div v-if="codeOpen" class="px-8 pb-4">
        <slot name="code">
          <p class="m-0 rounded-md bg-gray-100 px-4 py-3 font-mono text-[13px] text-gray-400">
            // Code snippet goes here — add via slot in each demo component
          </p>
        </slot>
      </div>
    </footer>
  </div>

  <!-- Fallback if route doesn't match any library -->
  <div v-else class="flex h-screen items-center justify-center text-sm text-gray-400">
    <p>Library not found for this route.</p>
  </div>
</template>
