const Line = require('../models/Line');
const Movement = require('../models/Movement');
const Project = require('../models/Project');
const { formatCurrency, formatPercentage } = require('../utils/calculations');

const updateMovementAndProject = async (movementId) => {
    const movement = await Movement.findById(movementId);
    if (!movement) return;

    const lines = await Line.find({ movement: movementId });

    movement.numbers.sumPrice.number = lines.reduce((acc, line) => acc + line.numbers.sumPrice.number, 0);
    movement.numbers.sumBudget.number = lines.reduce((acc, line) => acc + line.numbers.sumBudget.number, 0);
    movement.numbers.budgetUtility.number = movement.numbers.sumPrice.number - movement.numbers.sumBudget.number;
    movement.numbers.budgetMargin.number = movement.numbers.sumPrice.number 
        ? (movement.numbers.budgetUtility.number / movement.numbers.sumPrice.number) * 100
        : 0;

    movement.numbers.sumPrice.value = formatCurrency(movement.numbers.sumPrice.number);
    movement.numbers.sumBudget.value = formatCurrency(movement.numbers.sumBudget.number);
    movement.numbers.budgetUtility.value = formatCurrency(movement.numbers.budgetUtility.number);
    movement.numbers.budgetMargin.value = formatPercentage(movement.numbers.budgetMargin.number);

    await movement.save();

    await updateProject(movement.project);
};

const updateProject = async (projectId) => {
    const project = await Project.findById(projectId);
    if (!project) return;

    const movements = await Movement.find({ project: projectId });

    project.numbers.sumPrice.number = movements.reduce((acc, movement) => acc + movement.numbers.sumPrice.number, 0);
    project.numbers.sumBudget.number = movements.reduce((acc, movement) => acc + movement.numbers.sumBudget.number, 0);
    project.numbers.budgetUtility.number = project.numbers.sumPrice.number - project.numbers.sumBudget.number;
    project.numbers.budgetMargin.number = project.numbers.sumPrice.number 
        ? (project.numbers.budgetUtility.number / project.numbers.sumPrice.number) * 100
        : 0;

    project.numbers.sumPrice.value = formatCurrency(project.numbers.sumPrice.number);
    project.numbers.sumBudget.value = formatCurrency(project.numbers.sumBudget.number);
    project.numbers.budgetUtility.value = formatCurrency(project.numbers.budgetUtility.number);
    project.numbers.budgetMargin.value = formatPercentage(project.numbers.budgetMargin.number);

    await project.save();
};

module.exports = { updateMovementAndProject };
