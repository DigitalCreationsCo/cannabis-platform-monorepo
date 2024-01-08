/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { isEmpty } from '@cd/core-lib';
import { Router } from 'express';
import { StateService } from 'lib/fleet';
import TaskService from 'lib/fleet/TaskService';
import { ServiceUtils } from 'lib/fleet/utils/ServiceUtils';

const taskRoutes = Router();

taskRoutes.get('/tasks/:vehicleId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	if (!req.params.vehicleId) {
		console.error('The client requested tasks but did not supply a vehicleId.');
		ServiceUtils.setErrorResponse(
			res,
			'The vehicle ID must be specified.',
			400,
		);
		return res.end();
	}
	const vehicleId = req.params.vehicleId;
	const vehicle = StateService.getDeliveryVehicleById(vehicleId)!;
	if (vehicle === null) {
		console.error(`The client requested tasks for a non-existent vehicle.`);
		ServiceUtils.setErrorResponse(
			res,
			"The requested vehicle doesn't exist.",
			404,
		);
		return res.end();
	}
	const tasks = await TaskService.getTaskList(vehicle);
	res.write(JSON.stringify(tasks));
	res.flushHeaders();
});

taskRoutes.get('/taskInfoByTrackingId/:trackingId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	if (!req.params.trackingId) {
		console.error(
			'The client requested a task by tracking ID but did not supply a trackingId.',
		);
		ServiceUtils.setErrorResponse(
			res,
			'The tracking ID must be specified.',
			400,
		);
		return res.end();
	}
	const trackingId = req.params.trackingId;
	const task = StateService.getFleetConfigTaskByTrackingId(trackingId);
	if (!task) {
		console.error(
			`The tracking ID ${trackingId} does not exist in the manifest.`,
		);
		ServiceUtils.setErrorResponse(
			res,
			'The task with the tracking ID cannot be found.',
			404,
		);
		return res.end();
	}
	res.write(JSON.stringify(task));
	res.flushHeaders();
});

taskRoutes.get('/task/:taskId', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	if (!req.params.taskId) {
		console.error(
			'The client requested a task by tracking ID but did not supply a trackingId.',
		);
		ServiceUtils.setErrorResponse(
			res,
			'The tracking ID must be specified.',
			400,
		);
		return res.end();
	}
	const taskId = req.params.taskId;
	const manifestDataRequested = req.query.manifestDataRequested;

	if (manifestDataRequested && manifestDataRequested === 'true') {
		const task = StateService.getFleetConfigTask(taskId);
		if (!task) {
			console.error(`The task ID ${taskId} does not exist in the manifest.`);
			ServiceUtils.setErrorResponse(res, 'The task cannot be found.', 404);
			return res.end();
		}

		res.write(JSON.stringify(task));
		res.flushHeaders();
	} else {
		const task = StateService.getTaskById(taskId);
		if (!task) {
			console.error(
				`The client requested a task update, but the task ID ${taskId} does not match any task.`,
			);
			ServiceUtils.setErrorResponse(res, 'The task ID matched no tasks.', 400);
			return res.end();
		}
		const responseTask = await TaskService.getTask(taskId);
		res.write(JSON.stringify(responseTask));
		res.flushHeaders();
	}
});

taskRoutes.post('/:taskId', async (req, res) => {
	if (!req.params.taskId) {
		console.error(
			'The client requested a task update but did not supply a taskId.',
		);
		ServiceUtils.setErrorResponse(res, 'The task ID must be specified.', 400);
		return res.end();
	}
	const taskId = req.params.taskId;

	let task = StateService.getTaskById(taskId);
	if (!task) {
		console.error(
			`The client requested a task update, but the task ID ${taskId} does not match any task.`,
		);
		ServiceUtils.setErrorResponse(res, 'The task ID matched no tasks.', 404);
		return res.end();
	}

	const updates = JSON.parse(req.body);
	if (isEmpty(updates['task_outcome'])) {
		console.error(`No task outcome for task ID ${taskId} specified.`);
		ServiceUtils.setErrorResponse(res, 'No task outcome was specified.', 400);
		return res.end();
	}

	const taskOutcomeName = updates['task_outcome'] as string;
	task = await TaskService.updateTask(task, taskOutcomeName);

	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	res.write(JSON.stringify(task));
	res.flushHeaders();
});

taskRoutes.put('/:taskId', async (req, res) => {
	if (!req.params.taskId) {
		console.error(
			'The client requested a task update but did not supply a taskId.',
		);
		ServiceUtils.setErrorResponse(res, 'The task ID must be specified.', 400);
		return res.end();
	}
	const taskId = req.params.taskId;

	let task = StateService.getTaskById(taskId);
	if (!task) {
		console.error(
			`The client requested a task update, but the task ID ${taskId} does not match any task.`,
		);
		ServiceUtils.setErrorResponse(res, 'The task ID matched no tasks.', 404);
		return res.end();
	}

	const updatedTask = JSON.parse(req.body);

	if (task.taskOutcome === updatedTask.taskOutcome) {
		console.error(
			`The client requested a task update, but the new task outcome is the same as the original task outcome.`,
		);
		ServiceUtils.setErrorResponse(res, 'The task outcome must be updated', 400);
		return res.end();
	}

	task = await TaskService.updateTask(updatedTask, updatedTask.taskOutcome);

	res.setHeader('Content-Type', 'application/json');
	res.setDefaultEncoding('utf-8');
	res.write(JSON.stringify(task));
	res.flushHeaders();
});

export { taskRoutes };
