import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
        nestApp.enableCors();
        await nestApp.init();
        cachedServer = expressApp;
    }
    return cachedServer;
}
export default async (req, res) => {
    const server = await bootstrap();
    return server(req, res);
};
//# sourceMappingURL=index.js.map