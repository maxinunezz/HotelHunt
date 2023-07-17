/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string,
    readonly VITE_CLIENT_GOOGLE_ID: string,
    readonly VITE_URL: string,
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
