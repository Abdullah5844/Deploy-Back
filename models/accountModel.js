import mongoose, { Schema } from 'mongoose';

const accountSchema = new Schema({
  account_number: { type: Number, required: true, length: 6, unique: true },
  account_type: { type: String, required: true, enum: ['saving', 'checking', 'Saving', 'Checking'], unique:true },
  username: { type: String },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  balance: { type: Number, default: 0 },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
});

// Add a unique index constraint on account_number and account_type fields
accountSchema.index({ account_number: 1, account_type: 1 }, { unique: true });

const Account = mongoose.model('Account', accountSchema);

export default Account;