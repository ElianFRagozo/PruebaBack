const Line = require('../models/Line');
const Movement = require('../models/Movement');
const { updateMovementAndProject } = require('./movementService');
const { formatCurrency } = require('../utils/calculations');
const mongoose = require('mongoose');

const createLine = async (name, movementId, numbers) => {
    const movement = await Movement.findById(movementId);
    if (!movement) return null;

    const newLine = new Line({ name, movement: movementId, numbers });
    await newLine.save();

    // 🔄 Actualizar movimiento y proyecto
    await updateMovementAndProject(movementId);

    return newLine;
};

const getLinesByMovement = async (movementId) => {
    return await Line.find({ movement: movementId });
};

const deleteLinesByIds = async (lineIds) => {
    await Line.deleteMany({ _id: { $in: lineIds } });
};

const updateLine = async (lineId, data) => {
    if (!mongoose.Types.ObjectId.isValid(lineId)) {
        console.log(`❌ ID inválido: ${lineId}`);
        return null;
    }

    const line = await Line.findById(lineId);
    if (!line) {
        return null;
    }

    if (!line.numbers) {
        console.log('⚠️ La propiedad numbers no está definida en la línea');
        line.numbers = {
            sumPrice: { number: 0, value: '$0.00' },
            sumBudget: { number: 0, value: '$0.00' },
            budgetUtility: { number: 0, value: '$0.00' },
            budgetMargin: { number: 0, value: '0%' }
        };
    }

    // Validar que los valores sean numéricos
    const sumPrice = Number(data.sumPrice);
    const sumBudget = Number(data.sumBudget);

    if (isNaN(sumPrice) || isNaN(sumBudget)) {
        console.error(`❌ Error: sumPrice (${data.sumPrice}) o sumBudget (${data.sumBudget}) no son valores numéricos válidos.`);
        return null;
    }

    // Actualizar valores de la línea
    line.numbers.sumPrice.number = sumPrice;
    line.numbers.sumPrice.value = formatCurrency(sumPrice);

    line.numbers.sumBudget.number = sumBudget;
    line.numbers.sumBudget.value = formatCurrency(sumBudget);

    line.numbers.budgetUtility.number = sumPrice - sumBudget;
    line.numbers.budgetUtility.value = formatCurrency(line.numbers.budgetUtility.number);

    // Validar división por cero
    line.numbers.budgetMargin.number = sumPrice !== 0 ? (line.numbers.budgetUtility.number / sumPrice) * 100 : 0;
    line.numbers.budgetMargin.value = `${line.numbers.budgetMargin.number.toFixed(2)}%`;

    await line.save();

    // 🔄 Propagar cambios al movimiento y proyecto
    console.log('🔄 Propagando cambios...');
    await updateMovementAndProject(line.movement);

    return line;
};



module.exports = { createLine, getLinesByMovement, deleteLinesByIds, updateLine };
