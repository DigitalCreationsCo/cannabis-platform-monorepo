import { type POS } from '@cd/data-access';
type Inventory = any;

export function generateWidgetScriptTag({
	id,
	name,
	position,
	shape,
	pos,
	inventory,
	parentElement = null,
}: {
	id: string;
	name: string;
	position: string;
	shape: string;
	pos: POS;
	inventory: Inventory;
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
			inventory: ${inventory},
			parentElement: ${parentElement},
		});</script>`,
	).textContent as string;
}
