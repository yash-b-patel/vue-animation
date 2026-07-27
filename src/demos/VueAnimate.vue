<script setup lang="ts">
import '@asika32764/vue-animate/dist/vue-animate.css'
import { ref } from 'vue'

const effectOptions = [
  {
    label: 'back',
    options: ['backDown', 'backLeft', 'backRight', 'backUp'],
  },
  {
    label: 'bounce',
    options: ['bounce', 'bounceDown', 'bounceLeft', 'bounceRight', 'bounceUp'],
  },
  {
    label: 'fade',
    options: [
      'fade',
      'fadeBottomLeft',
      'fadeBottomRight',
      'fadeDown',
      'fadeDownBig',
      'fadeLeft',
      'fadeLeftBig',
      'fadeRight',
      'fadeRightBig',
      'fadeTopLeft',
      'fadeTopRight',
      'fadeUp',
      'fadeUpBig',
    ],
  },
  {
    label: 'flip',
    options: ['flip', 'flipX', 'flipY'],
  },
  {
    label: 'lightSpeed',
    options: ['lightSpeedLeft', 'lightSpeedRight'],
  },
  {
    label: 'rotate',
    options: ['rotate', 'rotateDownLeft', 'rotateDownRight', 'rotateUpLeft', 'rotateUpRight'],
  },
  {
    label: 'slide',
    options: ['slideDown', 'slideLeft', 'slideRight', 'slideUp'],
  },
  {
    label: 'roll',
    options: ['roll'],
  },
  {
    label: 'zoom',
    options: ['zoom', 'zoomDown', 'zoomLeft', 'zoomRight', 'zoomUp'],
  },
]

type Update = {
  id: number
  title: string
  detail: string
}

const selectedEffect = ref('fade')

const updates = ref<Update[]>([
  { id: 1, title: 'Inventory synced', detail: '124 products updated from the warehouse feed.' },
  { id: 2, title: 'Campaign queued', detail: 'Summer launch emails are ready for approval.' },
])

let nextId = 3

function addUpdate() {
  updates.value.unshift({
    id: nextId,
    title: `Automation run ${nextId}`,
    detail: 'A fresh status card enters with Animate.css classes.',
  })
  nextId += 1
}

function removeUpdate(id: number) {
  updates.value = updates.value.filter((update) => update.id !== id)
}
</script>

<template>
  <div class="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-violet-600">Vue Animate</p>
        <h2 class="mt-2 text-2xl font-bold text-slate-900">Activity Feed</h2>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          List items use Vue's TransitionGroup with vue-animate class names.
        </p>
      </div>
    </div>

    <div class="flex gap-2 items-center mt-1">
      <select
        id="effect"
        v-model="selectedEffect"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      >
        <optgroup v-for="group in effectOptions" :key="group.label" :label="group.label">
          <option v-for="effect in group.options" :key="effect" :value="effect">
            {{ effect }}
          </option>
        </optgroup>
      </select>

      <button
        class="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
        type="button"
        @click="addUpdate"
      >
        Add
      </button>
    </div>

    <TransitionGroup :name="selectedEffect" tag="div" class="mt-6 space-y-3">
      <article
        v-for="update in updates"
        :key="update.id"
        class="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-semibold text-slate-900">{{ update.title }}</h3>
            <p class="mt-1 text-sm leading-5 text-slate-500">{{ update.detail }}</p>
          </div>
          <button
            class="rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition bg-red-100 hover:text-red-900"
            type="button"
            @click="removeUpdate(update.id)"
          >
            Done
          </button>
        </div>
      </article>
    </TransitionGroup>
  </div>
</template>
