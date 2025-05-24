class UserService {
    constructor(repo) { this.repo = repo; }
    async getAll() { return this.repo.findAll(); }
    async getById(id) { return this.repo.findById(id); }
    async create(data) { return this.repo.create(data); }
    async update(id, data) { return this.repo.update(id, data); }
    async delete(id) { return this.repo.delete(id); }
    async count() { return this.repo.count(); }
    async findByEmail(email) { return this.repo.findByEmail(email); }
    async save(user) { return this.repo.save(user); }
  }
  module.exports = UserService;