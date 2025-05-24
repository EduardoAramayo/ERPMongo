const jwt = require('jsonwebtoken');
class AuthService {
  constructor(userRepo, emailSender) {
    this.userRepo = userRepo;
    this.emailSender = emailSender;
  }

  async register(email, password) {
    const count = await this.userRepo.count();
    const role = count === 0 ? 'admin' : 'user';
    return this.userRepo.create({ email, password, role });
  }

  async login(email, password) {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user || !(await user.matchPassword(password))) {
        throw new Error('Credenciales inválidas');
      }
      const code = Math.floor(100000 + Math.random()*900000).toString();
      user.securityCode = code;
      user.securityCodeExpires = Date.now() + 10*60*1000;
      await this.userRepo.save(user);
      await this.emailSender.sendSecurityCode(email, code);
      return user.id;
    } catch (err) {
      throw new Error('Error en el proceso de login: ' + (err.message || 'Error desconocido'));
    }
  }

  async verify(userId, code) {
    const user = await this.userRepo.findById(userId);
    if (!user || user.securityCode !== code || user.securityCodeExpires < Date.now()) {
      throw new Error('Código inválido o expirado');
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    user.securityCode = undefined;
    user.securityCodeExpires = undefined;
    await this.userRepo.save(user);
    return token;
  }
}
module.exports = AuthService;