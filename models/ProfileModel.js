const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    bio: {
      type: String,
      default: null,
    },
    social: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      twitter: { type: String, default: null },
      youtube: { type: String, default: null },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Profile', ProfileSchema);
