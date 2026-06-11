<script setup lang="ts">
// Constellation-style particle configuration
const particlesOptions = {
  fullScreen: {
    enable: false,
  },

  background: {
    color: {
      value: '#020617',
    },
  },

  fpsLimit: 120,

  particles: {
    number: {
      value: 80,
    },

    color: {
      value: '#ffffff',
    },

    links: {
      enable: true,
      distance: 150,
      opacity: 0.25,
      color: '#ffffff',
    },

    move: {
      enable: true,
      speed: 1,
    },

    opacity: {
      value: 0.5,
    },

    size: {
      value: {
        min: 1,
        max: 4,
      },
    },
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
    },

    modes: {
      grab: {
        distance: 180,

        links: {
          opacity: 1,
        },
      },
    },
  },

  detectRetina: true,
}
</script>

<template>
  <!-- Demo container -->
  <div class="relative h-full w-full overflow-hidden rounded-3xl">
    <!-- Particle background -->
    <vue-particles id="constellation" :options="particlesOptions" class="absolute inset-0" />

    <!-- Content -->
    <div
      class="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white"
    >
      <div class="text-6xl">✨</div>

      <h1 class="mt-4 text-5xl font-bold">Explore the Universe</h1>

      <p class="mt-4 max-w-lg text-slate-300">
        Move your cursor around to create dynamic star connections between particles.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Force tsParticles to stay inside the parent container */
:deep(#constellation) {
  width: 100%;
  height: 100%;
}

:deep(#constellation canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
