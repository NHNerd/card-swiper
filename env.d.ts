/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_URL: string;
  // Добавьте другие переменные окружения, если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
