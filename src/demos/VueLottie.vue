<script setup lang="ts">
import { ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

import trophyAnimation from '@/assets/lottie/trophy.json'

// Fake user stats
const xp = ref(1240)
const level = ref(8)

// Controls animation visibility
const showReward = ref(false)

function completeChallenge() {
  xp.value += 250
  if (xp.value >= 1500) level.value++
  // Replay animation
  showReward.value = false
  requestAnimationFrame(() => {
    showReward.value = true
  })
}
</script>

<template>
  <div class="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
    <!-- Profile summary -->
    <div class="text-center">
      <div class="text-5xl">🚀</div>
      <h2 class="mt-4 text-2xl font-bold">Developer Progress</h2>
      <p class="mt-2 text-slate-500">Complete challenges and earn XP.</p>
    </div>

    <!-- Stats -->
    <div class="mt-6 grid grid-cols-2 gap-4">
      <div class="rounded-xl bg-slate-100 p-4 text-center">
        <p class="text-sm text-slate-500">Level</p>
        <p class="text-3xl font-bold">{{ level }}</p>
      </div>
      <div class="rounded-xl bg-slate-100 p-4 text-center">
        <p class="text-sm text-slate-500">XP</p>
        <p class="text-3xl font-bold">{{ xp }}</p>
      </div>
    </div>

    <!-- Reward animation -->
    <Transition name="fade">
      <div v-if="showReward" class="mt-6">
        <!-- Lottie animation -->
        <Vue3Lottie
          :animation-data="trophyAnimation"
          :height="180"
          :width="180"
          :loop="false"
          :auto-play="true"
        />
        <p class="text-center font-semibold text-emerald-600">+250 XP Earned!</p>
      </div>
    </Transition>

    <!-- Trigger -->
    <button
      class="mt-6 w-full rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-700"
      @click="completeChallenge"
    >
      Complete Challenge
    </button>
  </div>
</template>
