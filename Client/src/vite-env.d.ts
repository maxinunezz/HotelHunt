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

///CLIENT_GOOGLE_ID="302631688539-a4hemnv3hsck7g1qjk9ti37s2t5mmvnh.apps.googleusercontent.com"