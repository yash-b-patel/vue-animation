<script setup lang="ts">
import { inject, onBeforeUnmount, ref } from 'vue'

const setCode = inject<(code: string) => void>('setCode')
const showMessage = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | undefined
const scriptEnd = '</' + 'script>'

const demoCode = `<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const showMessage = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | undefined

function copyInviteLink() {
  // Restart the timer when the button is clicked again.
  clearTimeout(hideTimer)
  showMessage.value = true

  hideTimer = setTimeout(() => {
    showMessage.value = false
  }, 2200)
}

onBeforeUnmount(() => clearTimeout(hideTimer))
${scriptEnd}

<template>
  <button @click="copyInviteLink">Copy invite link</button>

  <!-- Vue adds and removes these classes at the right time. -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-3 scale-95 opacity-0"
    enter-to-class="translate-y-0 scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 scale-100 opacity-100"
    leave-to-class="translate-y-2 scale-95 opacity-0"
  >
    <div v-if="showMessage">
      Invite link copied
    </div>
  </Transition>
</template>`

function copyInviteLink() {
  // Restart the timer when the button is clicked again.
  clearTimeout(hideTimer)
  showMessage.value = true

  hideTimer = setTimeout(() => {
    showMessage.value = false
  }, 2200)
}

setCode?.(demoCode)

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
  setCode?.('')
})
</script>

<template>
  <div
    class="relative flex min-h-90 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
  >
    <div class="flex max-w-sm flex-col items-center text-center">
      <div
        class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"
      >
        <svg
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </div>

      <p class="mb-6 text-sm leading-6 text-slate-500">
        Share this workspace with someone from your team.
      </p>

      <button
        class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="button"
        @click="copyInviteLink"
      >
        Copy invite link
      </button>
    </div>

    <!-- Transition handles the toast entering and leaving. -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-3 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 scale-100 opacity-100"
      leave-to-class="translate-y-2 scale-95 opacity-0"
    >
      <div
        v-if="showMessage"
        class="absolute bottom-6 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        role="status"
      >
        <span
          class="flex size-5 items-center justify-center rounded-full bg-emerald-400 text-slate-900"
        >
          <svg
            class="size-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m2.5 6 2.25 2.25L9.5 3.5" />
          </svg>
        </span>
        Invite link copied
      </div>
    </Transition>
  </div>
</template>
