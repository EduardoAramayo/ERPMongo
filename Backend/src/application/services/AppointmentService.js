class AppointmentService {
    constructor(repo) { this.repo = repo; }
    async getAll() { return this.repo.findAll(); }
    async getById(id) { return this.repo.findById(id); }
    async create(data) {
      // validaciones...
      return this.repo.create(data);
    }
    async update(id, data) { return this.repo.update(id, data); }
    async delete(id) { return this.repo.delete(id); }
  }
  module.exports = AppointmentService;