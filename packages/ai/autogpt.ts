import Agent, {
	type StepHandler,
	type StepInput,
	type StepResult,
	type TaskInput,
} from 'agent-protocol';

// export class Autogpt {
// 	agent: Agent;
// 	constructor() {
// 		this.agent = new Agent(taskHandler, {
// 			port: 8000,
// 			workspace: './workspace',
// 		});
// 		this.agent.start();
// 	}
// }
async function taskHandler(taskInput: TaskInput | null): Promise<StepHandler> {
	console.log(`task: ${taskInput}`);

	async function stepHandler(stepInput: StepInput | null): Promise<StepResult> {
		console.log(`step: ${stepInput}`);
		return {
			output: stepInput,
		};
	}

	return stepHandler;
}
Agent.handleTask(taskHandler, {
	port: 8000,
	workspace: './workspace',
});
const agent = new Agent(taskHandler, {
	port: 8000,
	workspace: './workspace',
});
agent.start();

export { agent };
