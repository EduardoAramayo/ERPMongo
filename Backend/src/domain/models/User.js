class User {
    constructor({ id, email, role, createdAt, updatedAt }) {
      this.id = id;
      this.email = email;
      this.role = role;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  module.exports = User;