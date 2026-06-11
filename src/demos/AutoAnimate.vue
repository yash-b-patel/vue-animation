<script setup lang="ts">
import { ref, computed } from 'vue'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

const items = [
  { id: 1, name: 'Avocado Toast', emoji: '🥑', category: 'Breakfast', calories: 320 },
  { id: 2, name: 'Chicken Salad', emoji: '🥗', category: 'Lunch', calories: 410 },
  { id: 3, name: 'Beef Burger', emoji: '🍔', category: 'Dinner', calories: 860 },
  { id: 4, name: 'Greek Yogurt', emoji: '🍦', category: 'Snack', calories: 150 },
  { id: 5, name: 'Pasta Arrabiata', emoji: '🍝', category: 'Dinner', calories: 540 },
  { id: 6, name: 'Banana Smoothie', emoji: '🍌', category: 'Breakfast', calories: 230 },
]

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'name', label: 'A → Z' },
  { value: 'calories', label: 'Calories' },
  { value: 'category', label: 'Category' },
]

const sortBy = ref('default')

const currentLabel = computed(() => sortOptions.find((o) => o.value === sortBy.value)?.label ?? '')

const sortedItems = computed(() => {
  const list = [...items]
  if (sortBy.value === 'name') return list.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'calories') return list.sort((a, b) => a.calories - b.calories)
  if (sortBy.value === 'category') return list.sort((a, b) => a.category.localeCompare(b.category))
  return list // default order
})
</script>

<template>
  <div class="w-full max-w-sm">
    <div class="mb-4 flex gap-2">
      <!-- Each button just changes the sort — AutoAnimate handles the rest -->
      <button
        v-for="opt in sortOptions"
        :key="opt.value"
        class="flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
        :class="
          sortBy === opt.value
            ? 'border-blue-300 bg-blue-50 text-blue-700'
            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
        "
        @click="sortBy = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <!--
      v-auto-animate is the only thing needed here.
      When `sortedItems` recomputes, the list items animate
      into their new positions automatically — no CSS, no JS animation code.
    -->
    <ul v-auto-animate class="flex flex-col gap-2">
      <li
        v-for="item in sortedItems"
        :key="item.id"
        class="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
      >
        <span class="text-xl">{{ item.emoji }}</span>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800">{{ item.name }}</p>
          <p class="text-xs text-gray-400">{{ item.category }} · {{ item.calories }} kcal</p>
        </div>
        <!-- small cal bar just for visual interest -->
        <div class="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
          <div
            class="h-full rounded-full bg-blue-400 transition-all duration-500"
            :style="{ width: `${(item.calories / 900) * 100}%` }"
          />
        </div>
      </li>
    </ul>

    <p class="mt-4 text-center text-xs text-gray-400">
      Sorted by: <span class="font-medium text-gray-600">{{ currentLabel }}</span>
    </p>
  </div>
</template>
