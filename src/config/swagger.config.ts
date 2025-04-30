import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

const configService = new ConfigService();

const PORT = configService.get('PORT') || 4000;

const swaggerConfig = new DocumentBuilder()
  .setTitle('Praevia API')
  .setDescription(
    'Praevia is an authentication and authorization system built with a focus on security, privacy, and software craftsmanship.',
  )
  .setContact(
    'Lucca Toledo',
    'https://www.linkedin.com/in/lucca-toledo/',
    'luccarebtoledo@gmail.com',
  )
  .setLicense('ISC', 'https://unlicense.org/')
  .addServer(`http://localhost:${PORT}/api/v1`, 'Development server')
  .setVersion('1.0')
  .addTag('health', 'Health check')
  .addTag('auth', 'Authentication and authorization')
  .addBearerAuth({
    type: 'apiKey',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'token',
    description:
      'This is a JWT token used for authenticating API requests. It should be included in the header of each request.',
  })
  .addGlobalResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access. Please provide valid credentials.',
  })
  .addGlobalResponse({
    status: HttpStatus.FORBIDDEN,
    description:
      'Forbidden access. You do not have permission to perform this action.',
  })
  .addGlobalResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An internal server error occurred. Please try again later.',
  })
  .build();

export default swaggerConfig;
