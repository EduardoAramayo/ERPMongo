const DoctorService = require('../src/application/services/DoctorService');

describe('DoctorService', () => {
  let repo, service;
  beforeEach(() => {
    repo = {
      findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
      findById: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'updated' }),
      delete: jest.fn().mockResolvedValue(true)
    };
    service = new DoctorService(repo);
  });

  test('getAll retorna doctores', async () => {
    const items = await service.getAll();
    expect(items).toEqual([{ id: 1 }]);
  });

  test('getById retorna doctor', async () => {
    const item = await service.getById(1);
    expect(item).toEqual({ id: 1 });
  });

  test('create crea doctor', async () => {
    const item = await service.create({ name: 'a' });
    expect(item).toEqual({ id: 2 });
  });

  test('update actualiza doctor', async () => {
    const item = await service.update(1, { name: 'updated' });
    expect(item.name).toBe('updated');
  });

  test('delete elimina doctor', async () => {
    const result = await service.delete(1);
    expect(result).toBe(true);
  });
});
