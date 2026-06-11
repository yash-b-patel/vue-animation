<script setup lang="ts">
import { motion } from 'motion-v'

/**
 * Demo: Animated card stack
 *
 * Features:
 * - Spring-based entry animation
 * - Staggered card appearance
 * - Slight rotation for stacked-card effect
 * - Hover interaction to lift and emphasize a card
 */
const cards = [
  { name: 'Analytics', color: 'from-violet-500 to-purple-500' },
  { name: 'Reports', color: 'from-blue-500 to-cyan-500' },
  { name: 'Inventory', color: 'from-green-500 to-emerald-500' },
]
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <div class="relative h-80 w-80">
      <!-- :initial = Initial state before animation -->
      <!-- :animate = Spring animation with staggered delay -->
      <!-- :while-hover = Lift card on hover -->
      <motion.div
        v-for="(card, i) in cards"
        :key="card.name"
        class="absolute inset-0 rounded-3xl bg-linear-to-br p-6 text-white shadow-2xl"
        :class="card.color"
        :initial="{
          scale: 0.8,
          opacity: 0,
          rotate: -20 + i * 10,
          y: 100,
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          rotate: -12 + i * 12,
          y: i * -20,
          transition: {
            delay: i * 0.2,
            type: 'spring',
            bounce: 0.4,
          },
        }"
        :while-hover="{
          scale: 1.08,
          y: i * -20 - 20,
          zIndex: 100,
        }"
      >
        <div class="text-2xl font-bold">{{ card.name }}</div>
        <div class="mt-4 text-sm opacity-80">Motion powered card stack</div>
      </motion.div>
    </div>
  </div>
</template>
