class AuthController {
    constructor(authService) { this.auth = authService; }
    register = async(req,res) => { const u=await this.auth.register(req.body.email,req.body.password); res.status(201).json(u); };
    login = async(req,res) => { const id=await this.auth.login(req.body.email,req.body.password); res.json({ userId:id }); };
    verify= async(req,res) => { const token=await this.auth.verify(req.body.userId,req.body.code); res.json({ token }); };
  }
module.exports = AuthController;