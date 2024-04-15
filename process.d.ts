declare namespace NodeJS {
  export interface ProcessEnv {
    BACKEND_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_BOT_NAME: string;
    NEXT_PUBLIC_YANDEX_KEY_ID: string;
    NEXT_PUBLIC_YANDEX_SECRET_KEY: string;
    NEXT_PUBLIC_YANDEX_BUCKET: string;
    NEXT_PUBLIC_YANDEX_REGION: string;
  }
}
