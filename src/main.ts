import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiVersion } from './app.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const appVersion = `/api/${apiVersion}`;
	app.setGlobalPrefix(appVersion);

	const options = new DocumentBuilder()
		.setTitle('Simed API')
		.setDescription('The Simed API description')
		.setVersion('1.0')
		//.addServer(appVersion)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger', app, document);
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
