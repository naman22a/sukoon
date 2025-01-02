declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            CLIENT_URL: string;
            SERVER_URL: string;
            CORS_ORIGIN: string;
        }
    }
}

export {};
