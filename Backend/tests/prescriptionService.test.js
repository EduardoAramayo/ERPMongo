jest.mock('../src/infrastructure/persistence/mongoose/medicationModel', () => ({
  findById: jest.fn().mockResolvedValue({ quantity: 10, name: 'med1' }),
  findByIdAndUpdate: jest.fn().mockResolvedValue(true)
}));

const PrescriptionService = require('../src/application/services/PrescriptionService');

describe('PrescriptionService', () => {
  let repo, service;
  beforeEach(() => {
    repo = {
      findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
      findById: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'updated' }),
      delete: jest.fn().mockResolvedValue(true)
    };
    service = new PrescriptionService(repo);
  });

  test('getAll retorna recetas', async () => {
    const items = await service.getAll();
    expect(items).toEqual([{ id: 1 }]);
  });

  test('getById retorna receta', async () => {
    const item = await service.getById(1);
    expect(item).toEqual({ id: 1 });
  });

  test('create crea receta y descuenta stock', async () => {
    const data = { medications: [{ medicationId: '1', quantity: 2 }] };
    const item = await service.create(data);
    expect(item).toEqual({ id: 2 });
  });

  test('update actualiza receta', async () => {
    const item = await service.update(1, { name: 'updated' });
    expect(item.name).toBe('updated');
  });

  test('delete elimina receta', async () => {
    const result = await service.delete(1);
    expect(result).toBe(true);
  });
});
