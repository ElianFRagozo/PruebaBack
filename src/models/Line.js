const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    movement: { type: mongoose.Schema.Types.ObjectId, ref: 'Movement', required: true },
    numbers: {
        sumPrice: { number: Number, value: String },
        sumBudget: { number: Number, value: String },
        budgetUtility: { number: Number, value: String },
        budgetMargin: { number: Number, value: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Line', lineSchema);
