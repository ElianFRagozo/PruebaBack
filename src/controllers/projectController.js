const { getPaginatedProjects } = require('../services/projectService');

exports.getProjectsController = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const userId = req.user.id;

        const projects = await getPaginatedProjects(userId, page, limit, search);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener proyectos', error });
    }
};
