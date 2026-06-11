<script setup lang="ts">
import { ref, computed } from 'vue'

// Skills data — nothing special, just content for the cards
const skills = [
  { id: 1, icon: '⚡', name: 'Vue 3', category: 'frontend', level: 'expert' },
  { id: 2, icon: '🎨', name: 'Tailwind CSS', category: 'frontend', level: 'expert' },
  { id: 3, icon: '🔷', name: 'TypeScript', category: 'frontend', level: 'comfortable' },
  { id: 4, icon: '🟢', name: 'Node.js', category: 'backend', level: 'comfortable' },
  { id: 5, icon: '🐘', name: 'PostgreSQL', category: 'backend', level: 'learning' },
  { id: 6, icon: '🔥', name: 'Firebase', category: 'backend', level: 'comfortable' },
  { id: 7, icon: '🐳', name: 'Docker', category: 'devops', level: 'learning' },
  { id: 8, icon: '🔁', name: 'CI/CD', category: 'devops', level: 'learning' },
  { id: 9, icon: '☁️', name: 'AWS', category: 'devops', level: 'comfortable' },
  { id: 10, icon: '🎭', name: 'Playwright', category: 'testing', level: 'comfortable' },
  { id: 11, icon: '🃏', name: 'Vitest', category: 'testing', level: 'expert' },
  { id: 12, icon: '📦', name: 'Vite', category: 'frontend', level: 'expert' },
]

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Testing', value: 'testing' },
]

const active = ref('all')

// Bump this to remount cards and replay their enter animation
const listKey = ref(0)

function setTab(val: string) {
  active.value = val
  listKey.value++
}

const visibleCards = computed(() =>
  active.value === 'all' ? skills : skills.filter((s) => s.category === active.value),
)

/*
  Each card gets a slightly different enter direction based on its position.
  Cards in even columns come from the left, odd from the right.
  Delay is staggered by index so they don't all pop in at once.
*/
function getInitial(i: number) {
  const fromLeft = i % 2 === 0
  return {
    opacity: 0,
    x: fromLeft ? -24 : 24,
    y: 10,
  }
}

function getEnter(i: number) {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: i * 60, // stagger — 60ms apart
      duration: 350,
      ease: 'easeOut',
    },
  }
}

// Visual helpers for skill level
const levelColor: Record<string, string> = {
  expert: 'bg-violet-400',
  comfortable: 'bg-blue-400',
  learning: 'bg-amber-300',
}

const levelBadge: Record<string, string> = {
  expert: 'bg-violet-50 text-violet-600',
  comfortable: 'bg-blue-50 text-blue-600',
  learning: 'bg-amber-50 text-amber-600',
}
</script>

<template>
  <div class="w-full max-w-2xl">
    <!-- Filter tabs -->
    <div class="mb-6 flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        :class="
          active === tab.value
            ? 'border-violet-300 bg-violet-50 text-violet-700'
            : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
        "
        @click="setTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!--
      Key trick: changing `listKey` forces Vue to remount every card.
      That re-triggers the v-motion directive so the enter animation
      plays again on each filter switch — not just on first load.
    -->
    <div :key="listKey" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div
        v-for="(card, i) in visibleCards"
        :key="card.id"
        v-motion
        :initial="getInitial(i)"
        :enter="getEnter(i)"
        class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <!-- colored top bar per skill level -->
        <div class="mb-3 h-1 w-8 rounded-full" :class="levelColor[card.level]" />

        <p class="text-2xl mb-2">{{ card.icon }}</p>
        <p class="text-sm font-semibold text-gray-800">{{ card.name }}</p>
        <p class="mt-0.5 text-xs text-gray-400">{{ card.category }}</p>

        <!-- level badge -->
        <span
          class="mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
          :class="levelBadge[card.level]"
        >
          {{ card.level }}
        </span>
      </div>
    </div>

    <p v-if="visibleCards.length === 0" class="mt-8 text-center text-sm text-gray-400">
      No skills in this category.
    </p>
  </div>
</template>
