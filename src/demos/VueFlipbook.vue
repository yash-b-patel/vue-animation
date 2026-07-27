<script setup lang="ts">
import Flipbook, { type SlotScope } from 'flipbook-vue'

function pageSvg(title: string, subtitle: string, fill: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960">
      <rect width="720" height="960" rx="36" fill="${fill}"/>
      <rect x="64" y="96" width="592" height="768" rx="28" fill="white" opacity="0.88"/>
      <text x="96" y="210" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" fill="#0f172a">${title}</text>
      <text x="96" y="292" font-family="Inter, Arial, sans-serif" font-size="28" fill="#475569">${subtitle}</text>
      <circle cx="560" cy="710" r="72" fill="#7c3aed" opacity="0.18"/>
      <rect x="96" y="694" width="300" height="24" rx="12" fill="#cbd5e1"/>
      <rect x="96" y="742" width="420" height="24" rx="12" fill="#e2e8f0"/>
    </svg>
  `

  // Flipbook consumes image URLs, so generated SVG pages are encoded as data URLs.
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const pages = [
  null,
  pageSvg('Front Cover', 'Product Brief', '#fef3c7'),
  pageSvg('Roadmap', 'Q3 product narrative', '#ddd6fe'),
  pageSvg('Signals', 'Customer themes and risks', '#bfdbfe'),
  pageSvg('Plan', 'Launch checklist and owners', '#bbf7d0'),
  pageSvg('Review', 'Metrics for the next retro', '#fecdd3'),
  pageSvg('Summary', 'Key takeaways and next steps', '#fef3c7'),
  pageSvg('Appendix', 'Additional context and references', '#fef9c3'),
  pageSvg('Back Cover', 'Thank you for reading!', '#fef3c7'),
] as unknown as string[]
</script>

<template>
  <div class="mx-auto w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
    <div class="mb-6">
      <p class="text-sm font-medium text-violet-600">Vue Flipbook</p>
      <h2 class="mt-2 text-2xl font-bold text-slate-900">Product Brief</h2>
      <p class="mt-2 text-sm leading-6 text-slate-500">
        A small image-backed brief with controls exposed by the default slot.
      </p>
    </div>

    <Flipbook
      v-slot="{ flipLeft, flipRight, canFlipLeft, canFlipRight, page, numPages }: SlotScope"
      class="flipbook-demo"
      :pages="pages"
    >
      <div class="flex items-center justify-between rounded-2xl bg-slate-100 p-3">
        <button
          class="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          :disabled="!canFlipLeft"
          @click="flipLeft"
        >
          Previous
        </button>
        <p class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ numPages }}</p>
        <button
          class="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          :disabled="!canFlipRight"
          @click="flipRight"
        >
          Next
        </button>
      </div>
    </Flipbook>
  </div>
</template>

<style scoped>
.flipbook-demo {
  height: 500px;
  width: 100%;
}

.flipbook-demo :deep(.viewport) {
  filter: drop-shadow(0 22px 32px rgb(15 23 42 / 0.16));
}
</style>
