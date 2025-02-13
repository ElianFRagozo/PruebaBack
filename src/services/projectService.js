const Project = require('../models/Project');

const getPaginatedProjects = async (userId, page, limit, search) => {
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { name: 1 }, // Orden alfabético A-Z
    };

    const query = { creator: userId };
    if (search) query.name = { $regex: search, $options: 'i' }; // 🔍 Búsqueda flexible (insensible a mayúsculas)

    return await Project.paginate(query, options);
};

module.exports = { getPaginatedProjects };
