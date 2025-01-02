export default () => ({
    enviroment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) ?? 5000,
    client_url: process.env.CLIENT_URL,
    server_url: process.env.SERVER_URL,
    origin: process.env.CORS_ORIGIN.split(','),
});
