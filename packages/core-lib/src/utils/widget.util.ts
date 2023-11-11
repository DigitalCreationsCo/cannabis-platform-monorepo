import { type POS } from '@cd/data-access';

export function generateWidgetScriptTag({
	id,
	name,
	position,
	shape,
	pos,
	parentElement = null,
}: {
	id: string;
	name: string;
	position: string;
	shape: string;
	pos: POS;
	parentElement?: string | null;
}) {
	return document.createTextNode(
		`<script 
		src="https://localhost:9000/widget.js"></script>
		<script>GrasDeliveryWidget.mount({
			dispensaryId: ${id}, 
			dispensaryName: ${name}, 
			position: ${position}, 
			shape: ${shape}, 
			pos: ${pos},
			parentElement: ${parentElement},
		});</script>`,
	).textContent as string;
}
