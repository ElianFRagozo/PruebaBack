const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    numbers: {
        sumPrice: { number: Number, value: String },
        sumBudget: { number: Number, value: String },
        budgetUtility: { number: Number, value: String },
        budgetMargin: { number: Number, value: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('Movement', movementSchema);
