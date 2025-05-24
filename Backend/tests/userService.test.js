const UserService = require('../src/application/services/UserService');

describe('UserService', () => {
  let repo, service;
  beforeEach(() => {
    repo = {
      findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
      findById: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'updated' }),
      delete: jest.fn().mockResolvedValue(true),
      count: jest.fn().mockResolvedValue(1),
      findByEmail: jest.fn().mockResolvedValue({ id: 1 }),
      save: jest.fn().mockResolvedValue({ id: 1 })
    };
    service = new UserService(repo);
  });

  test('getAll retorna usuarios', async () => {
    const users = await service.getAll();
    expect(users).toEqual([{ id: 1 }]);
  });

  test('getById retorna usuario', async () => {
    const user = await service.getById(1);
    expect(user).toEqual({ id: 1 });
  });

  test('create crea usuario', async () => {
    const user = await service.create({ name: 'a' });
    expect(user).toEqual({ id: 2 });
  });

  test('update actualiza usuario', async () => {
    const user = await service.update(1, { name: 'updated' });
    expect(user.name).toBe('updated');
  });

  test('delete elimina usuario', async () => {
    const result = await service.delete(1);
    expect(result).toBe(true);
  });

  test('count retorna cantidad de usuarios', async () => {
    const count = await service.count();
    expect(count).toBe(1);
  });

  test('findByEmail retorna usuario por email', async () => {
    const user = await service.findByEmail('test@mail.com');
    expect(user).toEqual({ id: 1 });
  });

  test('save actualiza usuario', async () => {
    const user = await service.save({ id: 1 });
    expect(user).toEqual({ id: 1 });
  });
});
