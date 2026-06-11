import type { RouteRecordRaw } from 'vue-router'

export type LibraryRoute = RouteRecordRaw & {
  id: string
  version: string
  npm: string | null
  description: string
  category: string
  source: () => Promise<{ default: string }>
}

export const LIBRARIES: LibraryRoute[] = [
  {
    id: 'vue-transition',
    name: 'Vue Transition',
    path: '/vue-transition',
    version: 'built-in',
    npm: null,
    description:
      "Vue's built-in animation system. Zero dependencies — transition single elements or animate lists with TransitionGroup.",
    category: 'Built-in',
    component: () => import('../demos/VueTransition.vue'),
    source: () => import('../demos/VueTransition.vue?raw'),
  },
  {
    id: 'auto-animate',
    name: 'AutoAnimate',
    path: '/auto-animate',
    version: '0.8.x',
    npm: '@formkit/auto-animate',
    description:
      'Add one directive and DOM mutations just animate. No configuration, no keyframes, no effort.',
    category: 'Zero-config',
    component: () => import('../demos/AutoAnimate.vue'),
    source: () => import('../demos/AutoAnimate.vue?raw'),
  },
  {
    id: 'vueuse-motion',
    name: '@vueuse/motion',
    path: '/vueuse-motion',
    version: '2.x',
    npm: '@vueuse/motion',
    description:
      'Composable-based animations with spring physics and scroll-triggered reveals. Built for Vue 3.',
    category: 'Composable',
    component: () => import('../demos/VueuseMotion.vue'),
    source: () => import('../demos/VueuseMotion.vue?raw'),
  },
  {
    id: 'gsap',
    name: 'GSAP',
    path: '/gsap',
    version: '3.12.x',
    npm: 'gsap',
    description:
      'The professional-grade animation platform. Timeline control, stagger, ScrollTrigger, SVG morphing — the full toolkit.',
    category: 'Power tool',
    component: () => import('../demos/VueGASP.vue'),
    source: () => import('../demos/VueGASP.vue?raw'),
  },
  {
    id: 'motion-one',
    name: 'Motion One',
    path: '/motion-one',
    version: '10.x',
    npm: 'motion-v',
    description:
      'Lightweight animation library built on the Web Animations API. 3kb with timeline and stagger support.',
    category: 'Lightweight',
    component: () => import('../demos/MotionOne.vue'),
    source: () => import('../demos/MotionOne.vue?raw'),
  },
  {
    id: 'vue-typed',
    name: 'Vue Typed',
    path: '/vue-typed',
    version: '2.x',
    npm: 'typed.js',
    description:
      'Typewriter effect component. Cycles through strings with configurable speed, backspace, and loop behavior.',
    category: 'Text effect',
    component: () => import('../demos/VueTyped.vue'),
    source: () => import('../demos/VueTyped.vue?raw'),
  },
  {
    id: 'vue-tilt',
    name: 'Vue Tilt.js',
    path: '/vue-tilt',
    version: '1.x',
    npm: 'vue-tilt.js',
    description:
      'Mouse-tracking parallax tilt on any element. Adds depth and a premium feel to cards and images.',
    category: '3D / Hover',
    component: () => import('../components/DemoPlaceholder.vue'),
    source: () => import('../components/DemoPlaceholder.vue?raw'),
  },
  {
    id: 'vue-lottie',
    name: 'Vue Lottie',
    path: '/vue-lottie',
    version: '0.x',
    npm: 'vue3-lottie',
    description:
      'Play After Effects animations exported as JSON. High-quality micro-animations for UI feedback states.',
    category: 'Micro-animation',
    component: () => import('../components/DemoPlaceholder.vue'),
    source: () => import('../components/DemoPlaceholder.vue?raw'),
  },
  {
    id: 'ts-particles',
    name: 'TS Particles',
    path: '/ts-particles',
    version: '3.x',
    npm: '@tsparticles/vue3',
    description:
      'Highly configurable particle engine. Confetti bursts, network graphs, snow, fire — all driven by JSON config.',
    category: 'Particles',
    component: () => import('../components/DemoPlaceholder.vue'),
    source: () => import('../components/DemoPlaceholder.vue?raw'),
  },
]

export function getLibraryByRoute(path: string) {
  return LIBRARIES.find((lib) => lib.path === path) || null
}
