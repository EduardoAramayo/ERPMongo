const AuthService = require('../src/application/services/AuthService');

describe('AuthService', () => {
  let mockRepo, mockEmailSender, service;

  beforeEach(() => {
    mockRepo = {
      count: jest.fn().mockResolvedValue(0),
      create: jest.fn().mockResolvedValue({ id: '1', email: 'test@mail.com', role: 'admin' }),
      findByEmail: jest.fn(),
      save: jest.fn(),
      findById: jest.fn()
    };
    mockEmailSender = { sendSecurityCode: jest.fn().mockResolvedValue(true) };
    service = new AuthService(mockRepo, mockEmailSender);
  });

  test('register debe crear usuario admin si es el primero', async () => {
    const user = await service.register('test@mail.com', '123456');
    expect(user.role).toBe('admin');
    expect(mockRepo.create).toHaveBeenCalledWith({ email: 'test@mail.com', password: '123456', role: 'admin' });
  });

  test('login lanza error si usuario no existe', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    await expect(service.login('no@mail.com', 'pass')).rejects.toThrow('Error en el proceso de login');
  });

  test('login lanza error si password es incorrecto', async () => {
    mockRepo.findByEmail.mockResolvedValue({ matchPassword: async () => false });
    await expect(service.login('test@mail.com', 'badpass')).rejects.toThrow('Error en el proceso de login');
  });

  test('login retorna id si credenciales son correctas', async () => {
    const user = { id: '1', matchPassword: async () => true };
    mockRepo.findByEmail.mockResolvedValue(user);
    mockRepo.save.mockResolvedValue(user);
    const id = await service.login('test@mail.com', '123456');
    expect(id).toBe('1');
    expect(mockEmailSender.sendSecurityCode).toHaveBeenCalled();
  });
});
