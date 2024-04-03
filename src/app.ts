import Server from './server';

const app = new Server()
    .enableCORS()
    .applyMiddleware()
    .applyRoutes()
    .enableMysql()
    .enableJWT()
    .enableSwagger()
    .enableLogger()
    .listen();

export default app;
