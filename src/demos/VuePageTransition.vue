<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { PageTransition, TransitionPresets } from 'vue3-page-transition'

const transitionOptions = [
  { label: 'Fade', value: TransitionPresets.fade },
  { label: 'Zoom', value: TransitionPresets.zoom },
  { label: 'Flip X', value: TransitionPresets.flipX },
  { label: 'Flip Y', value: TransitionPresets.flipY },
  { label: 'Fade In Left', value: TransitionPresets.fadeInLeft },
  { label: 'Fade In Right', value: TransitionPresets.fadeInRight },
  { label: 'Fade In Up', value: TransitionPresets.fadeInUp },
  { label: 'Fade In Down', value: TransitionPresets.fadeInDown },
]

const selectedTransition = ref(TransitionPresets.fade)

function createPage(title: string, background: string, description: string) {
  return defineComponent({
    name: title.replace(/\s+/g, ''),
    setup() {
      return () =>
        h(
          'div',
          {
            class: `rounded-3xl ${background} p-12 text-center text-white`,
          },
          [
            h('h2', { class: 'text-3xl font-bold' }, title),
            h('p', { class: 'mt-4 text-lg opacity-90' }, description),
          ],
        )
    },
  })
}

const pages = [
  createPage('Overview', 'bg-violet-600', 'This is the overview page.'),
  createPage('Analytics', 'bg-blue-600', 'This is the analytics page.'),
  createPage('Settings', 'bg-emerald-600', 'This is the settings page.'),
]

const currentPage = ref(0)

const currentComponent = computed(() => pages[currentPage.value])

function changePage() {
  let next = currentPage.value

  while (next === currentPage.value) {
    next = Math.floor(Math.random() * pages.length)
  }

  currentPage.value = next
}
</script>

<template>
  <div class="mx-auto w-full max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
    <div class="mb-8 flex flex-wrap items-center gap-4">
      <select v-model="selectedTransition" class="rounded-lg border border-slate-300 px-4 py-2">
        <option
          v-for="transition in transitionOptions"
          :key="transition.label"
          :value="transition.value"
        >
          {{ transition.label }}
        </option>
      </select>

      <button
        class="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-700"
        @click="changePage"
      >
        Change Page
      </button>
    </div>

    <PageTransition :name="selectedTransition" appear>
      <component :is="currentComponent" :key="currentPage" />
    </PageTransition>
  </div>
</template>
