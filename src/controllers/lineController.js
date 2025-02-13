const { updateLine, deleteLinesByIds, createLine, getLinesByMovement } = require('../services/lineService');

exports.createLineController = async (req, res) => {
    try {
        const { name, movementId, numbers } = req.body;
        const newLine = await createLine(name, movementId, numbers);

        if (!newLine) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        res.status(201).json(newLine);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la línea', error });
    }
};

exports.getLinesController = async (req, res) => {
    try {
        const { movementId } = req.params;
        const lines = await getLinesByMovement(movementId);
        res.json(lines);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener líneas', error });
    }
};

exports.deleteLinesController = async (req, res) => {
    try {
        const { lineIds } = req.body;
        await deleteLinesByIds(lineIds);
        res.json({ message: 'Líneas eliminadas correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar líneas', error });
    }
};

exports.updateLineController = async (req, res) => {
    try {
        const { id } = req.params;
        let { sumPrice, sumBudget } = req.body;

        // Asegurar que los valores sean numéricos válidos
        sumPrice = sumPrice !== undefined ? Number(sumPrice) : 0;
        sumBudget = sumBudget !== undefined ? Number(sumBudget) : 0;


        if (isNaN(sumPrice) || isNaN(sumBudget)) {
            return res.status(400).json({ message: "sumPrice o sumBudget no son números válidos." });
        }

        const updatedLine = await updateLine(id, { sumPrice, sumBudget });

        if (!updatedLine) {
            return res.status(404).json({ message: "Línea no encontrada" });
        }

        res.json({ message: "Línea actualizada con éxito", line: updatedLine });
    } catch (error) {
        console.error(`❌ Error al actualizar línea: ${error.message}`, error);
        res.status(500).json({ message: "Error al actualizar la línea", error: error.message });
    }
};




