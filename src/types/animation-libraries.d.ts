declare module 'vuenime' {
  import type { Component } from 'vue'

  export const Vuenime: Component

  const plugin: {
    install(app: unknown): void
  }

  export default plugin
}

declare module 'vue-morphling' {
  type MorphHost = {
    filter(name: string, formatter: (...args: unknown[]) => unknown): void
    prototype: Record<string, (...args: unknown[]) => unknown>
  }

  type MorphPlugin = {
    install(host: MorphHost, options?: unknown): void
  }

  export const morphCurrency: MorphPlugin
  export const morphDateFormat: MorphPlugin
  export const morphFileSize: MorphPlugin
}

declare module 'flipbook-vue' {
  import type { DefineComponent } from 'vue'

  type SlotScope = {
    canFlipLeft: boolean
    canFlipRight: boolean
    page: number
    numPages: number
    flipLeft(): void
    flipRight(): void
  }

  const Flipbook: DefineComponent<{
    pages: string[]
    flipDuration?: number
    singlePage?: boolean
    clickToZoom?: boolean
    dragToFlip?: boolean
  }>

  export type { SlotScope }
  export default Flipbook
}
