import { MockType } from './mock-type';

// @ts-ignore
export const serviceMockFactory: () => MockType<any> = jest.fn(() => ({
  findAll: jest.fn(entity => entity),
  findOne: jest.fn(entity => entity),
  findOneByID: jest.fn(entity => entity),
  findOneByName: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  update: jest.fn(entity => entity),
  updateAll: jest.fn(entity => entity),
  delete: jest.fn(entity => {
    return { raw: {}, affected: 1 };
  }),
}));
