const AppointmentService = require('../src/application/services/AppointmentService');

describe('AppointmentService', () => {
  let repo, service;
  beforeEach(() => {
    repo = {
      findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
      findById: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'updated' }),
      delete: jest.fn().mockResolvedValue(true)
    };
    service = new AppointmentService(repo);
  });

  test('getAll retorna citas', async () => {
    const items = await service.getAll();
    expect(items).toEqual([{ id: 1 }]);
  });

  test('getById retorna cita', async () => {
    const item = await service.getById(1);
    expect(item).toEqual({ id: 1 });
  });

  test('create crea cita', async () => {
    const item = await service.create({ name: 'a' });
    expect(item).toEqual({ id: 2 });
  });

  test('update actualiza cita', async () => {
    const item = await service.update(1, { name: 'updated' });
    expect(item.name).toBe('updated');
  });

  test('delete elimina cita', async () => {
    const result = await service.delete(1);
    expect(result).toBe(true);
  });
});
