import Joi from 'joi';

const trimmedStringSchema = Joi.string().trim().min(1).max(255);

const environmentVariablesSchema = Joi.object({
  NODE_ENV: trimmedStringSchema.valid('development', 'production', 'test'),
  PORT: Joi.number().port().required(),
  TZ: trimmedStringSchema.required(),
  PG_HOST: trimmedStringSchema.required(),
  PG_PORT: Joi.number().port().required(),
  PG_USER: trimmedStringSchema.required(),
  PG_PASSWORD: trimmedStringSchema.required(),
  PG_NAME: trimmedStringSchema.required(),
});

export default environmentVariablesSchema;
