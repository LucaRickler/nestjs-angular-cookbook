import { Repository } from 'typeorm';
import { MockType } from './mock-type';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  delete: jest.fn(entity => {
    return { raw: {}, affected: 1 };
  }),
}));
