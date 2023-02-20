import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaConsumerApp = 
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'profiles',
          brokers: ["broker:29092"],
        },
        consumer: {
          groupId: 'profiles',
        },
      },
    });
  await kafkaConsumerApp.listen(); 
  await app.listen(8189);
}
bootstrap();
