<script setup lang="ts">
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

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
})
</script>

<template>
  <div
    class="relative flex min-h-90 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
  >
    <div class="flex max-w-sm flex-col items-center text-center">
      <div
        class="mb-5 flex size-14 items-center justify-center rounded-2xl bg-indigo-50 cursor-pointer transition hover:bg-indigo-100"
        @click="copyInviteLink"
      >
        ↗️
      </div>

      <p class="mb-6 text-sm leading-6 text-slate-500">
        Share this workspace with someone from your team.
      </p>
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
        ✅ Invite link copied
      </div>
    </Transition>
  </div>
</template>
