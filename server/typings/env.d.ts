declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            CLIENT_URL: string;
            SERVER_URL: string;
            CORS_ORIGIN: string;
            DATABASE_URL: string;
            REDIS_URL: string;
            SESSION_SECRET: string;
            COOKIE_DOMAIN: string;
        }
    }
}

export {};
