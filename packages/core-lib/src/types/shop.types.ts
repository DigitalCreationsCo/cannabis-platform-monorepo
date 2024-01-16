import { type ProductVariant } from '@cd/data-access/src';

export interface WeedTextDeal {
	title: string;
	dealId: string;
	startTime: Date;
	endTime: Date;
	products: ProductVariant[];
	subtotal: number;
}
