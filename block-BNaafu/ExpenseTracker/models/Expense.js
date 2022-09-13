var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema(
  {
    source: { type: String, require: true },
    category: [{ type: String }],
    date: { type: Date },
    amount: { type: Number },
    type: { type: String, default: 'income' },
    createdBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

var Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
