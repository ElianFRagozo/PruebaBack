const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    numbers: {
        sumPrice: { number: Number, value: String },
        sumBudget: { number: Number, value: String },
        budgetUtility: { number: Number, value: String },
        budgetMargin: { number: Number, value: String }
    }
});

ProjectSchema.plugin(mongoosePaginate); // 🔹 Activamos la paginación

module.exports = mongoose.model('Project', ProjectSchema);

