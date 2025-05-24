class DoctorController {
  constructor(service) { this.s = service; }

  getAll = async (req, res) => res.json(await this.s.getAll());

  getById = async (req, res) => {
    const item = await this.s.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Doctor no encontrado' });
    res.json(item);
  };

  create = async (req, res) => {
    const newItem = await this.s.create(req.body);
    res.status(201).json(newItem);
  };

  update = async (req, res) => {
    const updated = await this.s.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Doctor no encontrado' });
    res.json(updated);
  };

  delete = async (req, res) => {
    await this.s.delete(req.params.id);
    res.json({ message: 'Doctor eliminado' });
  };
}
module.exports = DoctorController;
