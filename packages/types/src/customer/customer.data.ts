import { dispensaries } from '../dispensary/dispensaries.data';

/* METHODS
 * createCustomer
 * findCustomersByOrg
 * updateCustomer
 * deleteCustomer
 */

/**
 * create customer
 * @param customer customer data
 * @returns created customer
 */
export async function createCustomer(customer: any) {
	try {
		// wait 1 second

		return { id: '1', name: 'Test Customer' };
	} catch (error: any) {
		console.error('create order: ', error);
		if (error.message.includes('Invalid `prisma_default.order.create()`'))
			throw new Error('Invalid order.');
		throw new Error(error.message);
	}
}

/**
 * find customers by organization
 * @param organizationId organization id
 * @returns customers
 */
export async function findCustomersByOrg(organizationId: string) {
	try {
		const dispensary = dispensaries.find(
			(dispensary) => dispensary.id === organizationId,
		);
		if (!dispensary) throw new Error('Organization not found');
		return dispensary.customers || [];
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}

/**
 * update customer
 * @param id customer id
 * @param customer update data
 * @returns updated customer
 */
export async function updateCustomer(id: string, customer: any) {
	try {
		return;
	} catch (error: any) {
		if (error.code === 'P2025') throw new Error(`Order is not found.`);
		throw new Error(error.message);
	}
}

/**
 * delete customer
 * @param id customer id
 * @returns void
 */
export async function deleteCustomer(id: string) {
	try {
		return;
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
}
