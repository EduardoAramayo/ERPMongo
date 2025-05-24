const transporter = require('../../infrastructure/email/transporter.js');
async function sendSecurityCode(to,code) {
  const opts = { from: process.env.EMAIL_USER, to, subject:'Código de seguridad', text:`Código: ${code}` };
  await transporter.sendMail(opts);
}
module.exports = { sendSecurityCode };