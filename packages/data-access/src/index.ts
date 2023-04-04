export * from '@prisma/client';
export * from './address';
export * from './category';
export { default } from './db/prisma';
export * from './order';
export * from './organization';
export * from './product';
export * from './session';
export * from './user';

console.log('   data access bundle!');
console.log('node env: ', process.env.NODE_ENV);
