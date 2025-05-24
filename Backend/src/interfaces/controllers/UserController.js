class UserController {
    constructor(service) { this.s = service; }
  
    getAll = async (req, res) => {
      const items = await this.s.getAll();
      res.json(items);
    };
  
    getById = async (req, res) => {
      const item = await this.s.getById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(item);
    };
  
    update = async (req, res) => {
      const updated = await this.s.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(updated);
    };
  
    delete = async (req, res) => {
      await this.s.delete(req.params.id);
      res.json({ message: 'Usuario eliminado' });
    };
  }
  module.exports = UserController;