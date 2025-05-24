const IUserRepository = require('../../domain/interfaces/IUserRepository');
const UserModel = require('../persistence/mongoose/userModel');

class UserRepository extends IUserRepository {
  async count() {
    return UserModel.countDocuments({});
  }

  async findAll() {
    return UserModel.find({});
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(data) {
    return UserModel.create(data);
  }

  async save(user) {
    return user.save();
  }

  async update(id, data) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;