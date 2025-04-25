import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

const configService = new ConfigService();

const PORT = configService.get('PORT') || 4000;

const swaggerConfig = new DocumentBuilder()
  .setTitle('Previa API')
  .setDescription(
    'Praevia is an authentication and authorization system built with a focus on security, privacy, and software craftsmanship.',
  )
  .setContact(
    'Lucca Toledo',
    'https://www.linkedin.com/in/lucca-toledo/',
    'luccarebtoledo@gmail.com',
  )
  .setLicense('ISC', 'https://unlicense.org/')
  .addServer(`http://localhost:${PORT}`, 'Development server')
  .setBasePath('/api/v1')
  .setVersion('1.0')
  .addTag('health', 'Health check')
  .addTag('auth', 'Authentication and authorization')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'JWT authorization header using the Bearer scheme.',
  })
  .addGlobalResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An internal server error occurred. Please try again later.',
  })
  .addGlobalResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access. Please provide valid credentials.',
  })
  .build();

export default swaggerConfig;
