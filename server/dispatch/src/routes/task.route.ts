import { Router } from 'express';

const taskRoutes = Router();
taskRoutes.get('/', async (req, res) => {});

taskRoutes.post('/', async (req, res) => {});
taskRoutes.put('/:taskId', async (req, res) => {});

export { taskRoutes };
