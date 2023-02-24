// global.d.ts

export {};

declare global {
  interface Window {
    handleToken: (token: any) => void;
  }
}