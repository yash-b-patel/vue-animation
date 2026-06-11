<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Typed from 'typed.js'

// Template refs for Typed.js targets
const heroTyped = ref<HTMLElement | null>(null)
const terminalTyped = ref<HTMLElement | null>(null)

let heroInstance: Typed | null = null
let terminalInstance: Typed | null = null

onMounted(() => {
  // Hero text animation
  if (heroTyped.value) {
    heroInstance = new Typed(heroTyped.value, {
      strings: ['Frontend Developer', 'UI Designer', 'Coffee Addict ☕', 'Vue Enthusiast'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
    })
  }

  // Terminal-style typing animation
  if (terminalTyped.value) {
    terminalInstance = new Typed(terminalTyped.value, {
      strings: ['npm create vue@latest', 'npm run dev', 'git commit -m "typed animation demo"'],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2500,
      loop: true,
    })
  }
})

// Clean up Typed.js instances
onBeforeUnmount(() => {
  heroInstance?.destroy()
  terminalInstance?.destroy()
})
</script>

<template>
  <div class="mx-auto flex min-h-125 max-w-4xl flex-col items-center justify-center gap-12 px-6">
    <!-- Hero section -->
    <div class="text-center">
      <h1 class="text-5xl font-bold">
        I'm a
        <span ref="heroTyped" class="text-violet-600" />
      </h1>

      <p class="mt-4 text-lg text-gray-500">
        Simulating a portfolio hero section with rotating roles.
      </p>
    </div>

    <!-- Terminal demo -->
    <div class="w-full max-w-2xl rounded-xl bg-slate-900 p-6 font-mono text-green-400 shadow-xl">
      <!-- Window controls -->
      <div class="mb-4 flex gap-2">
        <div class="h-3 w-3 rounded-full bg-red-500" />
        <div class="h-3 w-3 rounded-full bg-yellow-500" />
        <div class="h-3 w-3 rounded-full bg-green-500" />
      </div>

      <div class="flex">
        <span class="mr-2 text-green-500">$</span>
        <span ref="terminalTyped" />
      </div>

      <p class="mt-4 text-slate-400">✔ Command executed successfully</p>
    </div>
  </div>
</template>
