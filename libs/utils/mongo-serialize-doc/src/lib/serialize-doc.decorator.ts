import { plainToClass } from 'class-transformer';
import { Type } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SerializeDocument = (value: Type): any => {
  return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = async function (...args) {
      const ret = await original.apply(this, args);

      if (!ret) {
        return ret;
      }

      if (Array.isArray(ret)) {
        return ret.map(item => plainToClass(value, item.toJSON()));
      }

      return plainToClass(value, ret.toJSON());
    };

    return descriptor;
  };
};
