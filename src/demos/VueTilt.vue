<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VanillaTilt from 'vanilla-tilt'

// Element that will receive the tilt effect
const tiltCard = ref(null)

onMounted(() => {
  if (!tiltCard.value) return

  // Initialize VanillaTilt
  VanillaTilt.init(tiltCard.value, {
    max: 20,
    speed: 500,
    glare: true,
    'max-glare': 0.3,
    scale: 1.05,
  })
})
</script>

<template>
  <div class="flex items-center justify-center">
    <!-- Interactive product card -->
    <div ref="tiltCard" class="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
      <!-- Product preview -->
      <div
        class="flex h-64 items-center justify-center bg-linear-to-br from-violet-500 to-fuchsia-500"
      >
        <div class="text-center text-white">
          <div class="text-7xl">🎧</div>
          <p class="mt-3 text-sm uppercase tracking-[0.3em]">Premium Audio</p>
        </div>
      </div>

      <!-- Product details -->
      <div class="space-y-4 p-6">
        <div>
          <h2 class="text-2xl font-bold">Wave Pro Headphones</h2>

          <p class="mt-2 text-sm text-slate-500">
            Hover over the card to experience a realistic 3D tilt effect.
          </p>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold">$299</span>

          <button
            class="rounded-xl bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
