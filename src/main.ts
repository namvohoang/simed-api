import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiVersion } from './app.config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
	app.useGlobalPipes(new ValidationPipe());
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

	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	await app.listen(process.env.PORT || 3003);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
