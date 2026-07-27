<script setup lang="ts">
import { computed, ref } from 'vue'
import { morphCurrency, morphDateFormat, morphFileSize } from 'vue-morphling'

type MorphFormatter = (...args: unknown[]) => unknown

const morphHost = {
  filter: () => undefined,
  prototype: {} as Record<string, MorphFormatter>,
}

// Vue 3 removed filters, so the Vue 2 plugin is installed into a tiny host to access its methods.
morphCurrency.install(morphHost)
morphDateFormat.install(morphHost)
morphFileSize.install(morphHost)

function formatter(name: string) {
  const format = morphHost.prototype[name]
  if (!format) throw new Error(`Vue-Morphling formatter ${name} was not registered.`)
  return format
}

const seats = ref(8)
const invoice = {
  product: 'Design System Workshop',
  orderedAt: new Date(2026, 6, 24, 10, 30),
  recordingBytes: 768_420_864,
  seatPrice: 149,
}

const subtotal = computed(() => seats.value * invoice.seatPrice)
const formattedTotal = computed(() => formatter('$morphCurrency')(subtotal.value, 'USD'))
const formattedDate = computed(() =>
  formatter('$morphDateFormat')(invoice.orderedAt, 'MMM d, yyyy'),
)
const formattedFileSize = computed(() =>
  formatter('$morphFileSize')(invoice.recordingBytes, { round: 1 }),
)
</script>

<template>
  <div class="mx-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
    <div>
      <p class="text-sm font-medium text-violet-600">Vue-Morphling</p>
      <h2 class="mt-2 text-2xl font-bold text-slate-900">Order Summary</h2>
      <p class="mt-2 text-sm leading-6 text-slate-500">
        Morphling's formatters are called from computed values instead of Vue 2 filter pipes.
      </p>
    </div>

    <div class="mt-6 space-y-3 rounded-2xl bg-slate-100 p-5">
      <div class="flex justify-between gap-4">
        <span class="text-sm text-slate-500">Package</span>
        <span class="text-sm font-semibold text-slate-900">{{ invoice.product }}</span>
      </div>
      <div class="flex justify-between gap-4">
        <span class="text-sm text-slate-500">Ordered</span>
        <span class="text-sm font-semibold text-slate-900">{{ formattedDate }}</span>
      </div>
      <div class="flex justify-between gap-4">
        <span class="text-sm text-slate-500">Recording</span>
        <span class="text-sm font-semibold text-slate-900">{{ formattedFileSize }}</span>
      </div>
      <div class="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
        <label class="text-sm text-slate-500" for="seat-count">Seats</label>
        <input
          id="seat-count"
          v-model.number="seats"
          class="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm font-semibold text-slate-900 outline-none focus:border-violet-400"
          max="16"
          min="1"
          type="number"
        />
      </div>
    </div>

    <div class="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
      <p class="text-sm text-slate-300">Invoice total</p>
      <p class="mt-1 text-4xl font-bold">{{ formattedTotal }}</p>
    </div>
  </div>
</template>
