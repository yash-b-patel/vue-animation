<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLibraryByRoute } from '@/constants/libraries'

const route = useRoute()
const codeOpen = ref(false)
const codeBesideDemo = ref(false)
const codeSnippet = ref('')

const library = computed(() => getLibraryByRoute(route.path))

watch(
  () => library.value,
  async () => {
    if (library.value)
      codeSnippet.value = library.value
        ? (await library.value.source()).default
        : '// No snippet provided for this demo yet.'
  },
)

function toggleCodePosition() {
  codeBesideDemo.value = !codeBesideDemo.value
  codeOpen.value = true
}
</script>

<template>
  <div v-if="library" class="flex h-screen flex-col overflow-hidden">
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
        <p class="text-sm leading-6 text-gray-500">{{ library.description }}</p>
      </div>
    </header>

    <div class="flex min-h-0 flex-1">
      <!-- RouterView loads the demo here. -->
      <main class="flex min-w-0 flex-1 items-start justify-center overflow-y-auto bg-gray-50 p-8">
        <RouterView />
      </main>

      <aside
        v-if="codeBesideDemo"
        class="min-w-0 overflow-hidden border-l border-gray-200 transition-all duration-300"
        :class="{ 'w-1/2': codeOpen }"
      >
        <div class="flex items-center">
          <button
            class="flex flex-1 cursor-pointer items-center gap-2 border-0 bg-transparent px-8 py-3 text-left text-[13px] font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
            type="button"
            @click="codeOpen = !codeOpen"
          >
            <svg
              class="size-3 transition-transform"
              :class="{ 'rotate-90': codeOpen }"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path d="m4 2 4 4-4 4" />
            </svg>
            Key code snippet
          </button>

          <button
            class="mr-4 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            type="button"
            :title="codeBesideDemo ? 'Show code below the demo' : 'Show code beside the demo'"
            @click="toggleCodePosition"
          >
            {{ codeBesideDemo ? 'Dock below' : 'Dock right' }}
          </button>
        </div>
        <div v-if="codeOpen" class="px-8 pb-4">
          <pre
            class="h-[calc(100vh-8rem)] overflow-auto rounded-lg bg-slate-950 p-4 text-[12px] leading-5 whitespace-pre-wrap text-slate-300"
          ><code>{{ codeSnippet || '// No snippet provided for this demo yet.' }}</code></pre>
        </div>
      </aside>
    </div>

    <!-- The code can open below the demo or beside it. -->
    <footer v-if="!codeBesideDemo" class="shrink-0 border-t border-gray-200 bg-white">
      <div class="flex items-center">
        <button
          class="flex flex-1 cursor-pointer items-center gap-2 border-0 bg-transparent px-8 py-3 text-left text-[13px] font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
          type="button"
          @click="codeOpen = !codeOpen"
        >
          <svg
            class="size-3 transition-transform"
            :class="{ 'rotate-90': codeOpen }"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path d="m4 2 4 4-4 4" />
          </svg>
          Key code snippet
        </button>

        <button
          class="mr-4 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          type="button"
          :title="codeBesideDemo ? 'Show code below the demo' : 'Show code beside the demo'"
          @click="toggleCodePosition"
        >
          {{ codeBesideDemo ? 'Dock below' : 'Dock right' }}
        </button>
      </div>

      <div v-if="codeOpen" class="px-8 pb-4">
        <pre
          class="max-h-72 overflow-auto rounded-lg bg-slate-950 p-4 text-[12px] leading-5 whitespace-pre-wrap text-slate-300"
        ><code>{{ codeSnippet || '// No snippet provided for this demo yet.' }}</code></pre>
      </div>
    </footer>
  </div>

  <div v-else class="flex h-screen items-center justify-center text-sm text-gray-400">
    <p>Library not found for this route.</p>
  </div>
</template>
