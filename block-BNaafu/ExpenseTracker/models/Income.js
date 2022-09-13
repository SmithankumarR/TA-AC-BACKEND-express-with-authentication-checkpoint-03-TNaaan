var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incomeSchema = new Schema(
  {
    source: { type: String, require: true },
    date: { type: Date },
    amount: { type: Number },
    type: { type: String, default: 'income' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

var Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
