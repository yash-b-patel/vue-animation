<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const bellBtn = ref<HTMLElement | null>(null)
const badgeDot = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)

const isPlaying = ref(false)

// hold the timeline so we can kill it on manual dismiss
let tl: gsap.core.Timeline | null = null

function triggerSequence() {
  if (isPlaying.value) return
  isPlaying.value = true

  // kill any previous run so re-triggering always starts clean
  tl?.kill()
  gsap.set(card.value, { x: '110%' })
  gsap.set(progressBar.value, { scaleX: 1, transformOrigin: 'left center' })
  gsap.set(badgeDot.value, { opacity: 0, scale: 0 })

  tl = gsap.timeline({
    onComplete: () => {
      isPlaying.value = false
    },
  })

  // 1. badge dot pops in
  tl.to(badgeDot.value, {
    opacity: 1,
    scale: 1,
    duration: 0.25,
    ease: 'back.out(2)',
  })

  // 2. bell shakes — keyframes let you define a mini sequence in one .to()
  tl.to(
    bellBtn.value,
    {
      keyframes: [
        { rotation: -18, duration: 0.08 },
        { rotation: 18, duration: 0.08 },
        { rotation: -12, duration: 0.07 },
        { rotation: 12, duration: 0.07 },
        { rotation: 0, duration: 0.06 },
      ],
    },
    '<',
  ) // '<' means start at same time as previous

  // 3. card slides in from the right — Back ease gives the slight overshoot
  tl.to(
    card.value,
    {
      x: 0,
      duration: 0.5,
      ease: 'back.out(1.4)',
    },
    '-=0.1',
  )

  // 4. progress bar drains — this is what drives the auto-dismiss timing
  tl.to(
    progressBar.value,
    {
      scaleX: 0,
      duration: 3.5,
      ease: 'none', // linear so it feels like a real timer
    },
    '+=0.2',
  )

  // 5. card slides back out
  tl.to(card.value, {
    x: '110%',
    duration: 0.35,
    ease: 'power2.in',
  })

  // 6. badge fades out
  tl.to(
    badgeDot.value,
    {
      opacity: 0,
      scale: 0,
      duration: 0.2,
      ease: 'power1.in',
    },
    '<',
  )
}

// let the user dismiss early — just fast-forward the timeline
function dismiss() {
  tl?.progress(0.85).timeScale(3)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-8">
    <!-- Bell trigger button -->
    <div class="flex flex-col items-center gap-4">
      <button
        ref="bellBtn"
        class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md border border-gray-100 text-3xl disabled:opacity-50"
        :disabled="isPlaying"
        @click="triggerSequence"
      >
        🔔
        <!-- red dot — hidden until sequence starts -->
        <span
          ref="badgeDot"
          class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center opacity-0"
        >
          1
        </span>
      </button>
      <p class="text-xs text-gray-400">{{ isPlaying ? 'playing...' : 'Click the bell' }}</p>
    </div>

    <!-- Notification card — starts off-screen to the right -->
    <div class="relative w-full overflow-hidden rounded-xl">
      <div
        ref="card"
        class="w-full translate-x-[110%] rounded-xl border border-gray-100 bg-white p-4 shadow-lg"
      >
        <!-- card header -->
        <div class="mb-3 flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-lg"
          >
            💬
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800">New message from Sarah</p>
            <p class="text-xs text-gray-400 mt-0.5">just now</p>
          </div>
          <button
            class="shrink-0 text-gray-300 hover:text-gray-500 text-lg leading-none"
            @click="dismiss"
          >
            ×
          </button>
        </div>

        <p class="text-xs text-gray-500 mb-3 leading-relaxed">
          "Hey, are you free for a quick call tomorrow morning? Need to go over the design review."
        </p>

        <!-- progress bar — GSAP tweens the width from 100% → 0% -->
        <div class="h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div ref="progressBar" class="h-full w-full rounded-full bg-violet-400" />
        </div>
      </div>
    </div>
  </div>
</template>
