<script setup lang="ts">
import { computed, defineComponent, h, ref, type Component } from 'vue'
import { Vuenime } from 'vuenime'

defineOptions({
  name: 'VuenimeDemo',
})

const VuenimeValue = defineComponent({
  name: 'VuenimeValue',
  props: {
    value: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    easing: {
      type: String,
      default: 'easeOutElastic(1, .5)',
    },
    round: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(Vuenime as Component, {
        ...props,
        // Vuenime's Vue 2 build supports render props; this adapter exposes it as a Vue 3 slot.
        render: (value: number) => slots.default?.(value),
      })
  },
})

const xp = ref(420)
const levelTarget = ref(3)

const progress = computed(() => Math.min(100, Math.round((xp.value / 1200) * 100)))

function completeSprint() {
  xp.value = xp.value >= 1200 ? 420 : xp.value + 260
  levelTarget.value = xp.value >= 940 ? 4 : 3
}
</script>

<template>
  <div class="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
    <div class="text-center">
      <p class="text-sm font-medium text-violet-600">Vuenime</p>
      <h2 class="mt-2 text-2xl font-bold text-slate-900">Sprint XP Reveal</h2>
      <p class="mt-2 text-sm leading-6 text-slate-500">
        Vuenime tweens the number value while Vue renders the dashboard.
      </p>
    </div>

    <div class="mt-6 rounded-2xl bg-slate-100 p-5">
      <VuenimeValue v-slot="animatedXp" :value="xp" :duration="1200" :round="1" easing="easeOutCubic">
        <div>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-sm text-slate-500">Current XP</p>
              <p class="text-4xl font-bold text-slate-900">{{ animatedXp }}</p>
            </div>
            <VuenimeValue v-slot="animatedLevel" :value="levelTarget" :duration="900" :round="1">
              <p class="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Level {{ animatedLevel }}
              </p>
            </VuenimeValue>
          </div>

          <div class="mt-5 h-3 overflow-hidden rounded-full bg-white">
            <div
              class="h-full rounded-full bg-violet-600 transition-[width] duration-500"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </VuenimeValue>
    </div>

    <button
      class="mt-6 w-full rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700"
      type="button"
      @click="completeSprint"
    >
      Complete Sprint
    </button>
  </div>
</template>
