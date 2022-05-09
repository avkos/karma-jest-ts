require('jest-extended');
process.env.NODE_ENV = 'test';

const jestTimeout = 10000;

jest.setTimeout(jestTimeout);
