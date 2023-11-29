import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.SERVER_PORT;

  await app.listen(PORT);
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
