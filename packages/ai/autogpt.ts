/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Agent, {
	createAgentTask,
	type StepHandler,
	type StepInput,
	type StepResult,
	type TaskInput,
} from 'agent-protocol';
import { openai } from './openai';

async function taskHandler(
	taskId: any,
	taskInput: TaskInput | null,
): Promise<StepHandler> {
	async function stepHandler(stepInput: StepInput | null): Promise<StepResult> {
		try {
			console.log(`step: ${stepInput}`);
			const output = await openai.openai!.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: taskInput },
					{ role: 'user', content: stepInput },
				],
			});

			return {
				output,
			};
		} catch (error) {
			console.error('stepHandler: ', error.message);
			throw new Error(error.message);
		}
	}
	try {
		console.log(`task: ${taskId}`);

		return stepHandler;
	} catch (error) {
		console.error('taskHandler: ', error.message);
		throw new Error(error.message);
	}
}

const agent = new Agent(taskHandler, {
	port: 8000,
	workspace: './workspace',
});

export { agent, createAgentTask };
