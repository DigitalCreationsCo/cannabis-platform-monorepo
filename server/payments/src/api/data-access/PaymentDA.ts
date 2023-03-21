
/* =================================
Payment Data Access - data class for order table

members: 
processPayment

================================= */

export default class OrderDA {
    static async processPayment({ order, total }) {
        try {
            // test func
            return { success: true };
        } catch (e) {
            return { error: e };
        }
    }
}
