<script setup lang="ts">
import { ref } from 'vue'

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    copy: 'Review the launch scope, priority channels, and owners before planning starts.',
  },
  {
    id: 'timeline',
    title: 'Timeline',
    copy: 'Map milestones into weekly delivery windows and keep the handoffs visible.',
  },
  {
    id: 'handoff',
    title: 'Handoff',
    copy: 'The final anchor uses a negative offset so the section title lands below the sticky nav.',
  },
]
const sectionEls = ref<Record<string, HTMLElement | null>>({})

function setSectionRef(el: HTMLElement | null, id: string) {
  sectionEls.value[id] = el
}

function scrollToSection(id: string) {
  const target = sectionEls.value[id]

  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <div class="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
    <div>
      <p class="text-sm font-medium text-violet-600">Vue Smooth Scroll</p>

      <h2 class="mt-2 text-2xl font-bold text-slate-900">Launch Notes</h2>

      <p class="mt-2 text-sm text-slate-500">
        Click the buttons to smoothly scroll to each section.
      </p>
    </div>

    <nav class="sticky top-0 z-10 mt-6 flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow transition hover:bg-violet-50 hover:text-violet-600"
        @click="scrollToSection(section.id)"
      >
        {{ section.title }}
      </button>
    </nav>

    <div
      id="launch-scroll-area"
      ref="scrollContainer"
      class="mt-6 max-h-96 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <section
        v-for="section in sections"
        :key="section.id"
        :ref="(el) => setSectionRef(el as HTMLElement | null, section.id)"
        class="min-h-60 rounded-2xl bg-white p-6 shadow-sm"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
          {{ section.id }}
        </p>

        <h3 class="mt-3 text-2xl font-bold text-slate-900">
          {{ section.title }}
        </h3>

        <p class="mt-3 text-sm leading-7 text-slate-500">
          {{ section.copy }}
        </p>
      </section>
    </div>
  </div>
</template>
