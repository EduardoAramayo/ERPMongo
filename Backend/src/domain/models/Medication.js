class Medication {
    constructor({ id, name, description, quantity, expiryDate, createdAt, updatedAt }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.quantity = quantity;
      this.expiryDate = expiryDate;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  module.exports = Medication;