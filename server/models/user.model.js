const mongoose = require('mongoose');

// This is added bc a warnig:
// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;

// Schema options:
// collection: name of the collection
// versionKey: remove the _v propertie on the db
let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: true,
    default: true
  }
}, { collection: 'users', versionKey: false });

// Hide the password propertie in the response
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;

  return userObject;
}

module.exports = mongoose.model('User', UserSchema);