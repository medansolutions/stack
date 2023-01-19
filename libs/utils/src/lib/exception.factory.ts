import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const ExceptionFactory = (errors: ValidationError[]) => {
  const result = errors.map((error) => ({
    [error.property]: error.constraints,
  }));

  return new BadRequestException(result);
};
