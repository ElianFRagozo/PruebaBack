const { createMovement, getMovementsByProject, deleteMovementsByIds } = require('../services/movementService');

exports.createMovementController = async (req, res) => {
    try {
        const { name, projectId, numbers } = req.body;
        const newMovement = await createMovement(name, projectId, numbers);

        if (!newMovement) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.status(201).json(newMovement);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el movimiento', error });
    }
};

exports.getMovementsController = async (req, res) => {
    try {
        const { projectId } = req.params;
        const movements = await getMovementsByProject(projectId);
        res.json(movements);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener movimientos', error });
    }
};

exports.deleteMovementsController = async (req, res) => {
    try {
        const { movementIds } = req.body;
        await deleteMovementsByIds(movementIds);
        res.json({ message: 'Movimientos eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar movimientos', error });
    }
};
