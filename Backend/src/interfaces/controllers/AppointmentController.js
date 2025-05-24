class AppointmentController {
    constructor(service) { this.s = service; }
    getAll = async(req,res) => res.json(await this.s.getAll());
    getById = async(req,res) => { const a = await this.s.getById(req.params.id); if(!a) return res.status(404).json({message:'No enc.'}); res.json(a); };
    create = async(req,res) => res.status(201).json(await this.s.create(req.body));
    update = async(req,res) => { const u=await this.s.update(req.params.id,req.body); if(!u) return res.status(404).json({message:'No enc.'}); res.json(u); };
    delete = async(req,res) => {await this.s.delete(req.params.id); res.json({message:'Eliminada'});};
  }
  module.exports = AppointmentController;