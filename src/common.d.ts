declare module '*.png'
declare module '*.svg'
declare const Omega: {
  appKey: string
  autoPosition: boolean
  userName: string
  trackEvent(eventName: string, desc: string, attr: { [key: string]: string | number }): void
  sendPageView(): Promise<void>
}
