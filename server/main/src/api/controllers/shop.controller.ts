import { OrderDA } from '../data-access';
// import Stripe from "stripe";
// import stipeNode from "stripe";

/* =================================
ShopController - controller class for ecommerce business actions

members:
getOrdersByOrg
getOrderById
updateOrderById

getProductsByOrg
getProductById
searchProducts

// createOrder
================================= */

export default class ShopController {
    static async getOrdersByOrg(req, res) {
        try {
            const organizationId = req.params.id || {};
            const data = await OrderDA.getOrdersByOrg(organizationId);
            if (!data) return res.status(404).json('Orders not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getOrderById(req, res) {
        try {
            const id = req.params.id || '';
            const data = await OrderDA.getOrderById(id);
            // this is the preferred pattern for controller responses VV
            // across ALL apps and systems
            if (!data) return res.status(404).json('Order not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async updateOrderById(req, res) {
        try {
            const order = req.body;
            const data = await OrderDA.updateOrderById(order);
            if (!data) return res.status(400).json('Could not update');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getProductsByOrg(req, res) {
        try {
            const organizationId = req.params.id || {};
            const data = await OrderDA.getProductsByOrg(organizationId);
            if (!data) return res.status(404).json('Products not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async getProductById(req, res) {
        try {
            const id = req.params.id || '';
            const data = await OrderDA.getProductById(id);
            // this is the preferred pattern for controller responses VV
            // across ALL apps and systems
            if (!data) return res.status(404).json('Product not found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    static async searchProducts(req, res) {
        try {
            const { search, organizationId } = req.body;
            const data = await OrderDA.searchProducts(search, organizationId);
            if (!data) return res.status(404).json('Products Not Found');
            return res.status(200).json(data);
        } catch (error) {
            console.log('API error: ', error);
            res.status(500).json({ error });
        }
    }

    // static async createOrder(req, res) {
    //   try {
    //     const { values, customerId, amount, tax, items, subtotal } = req.body

    //     const {
    //       cardCVC,
    //       cardNumber,
    //       cardYear,
    //       cardMonth,
    //       cardHolderName,
    //       checkCard,
    //       card,
    //       address,
    //       date,
    //       time,
    //       paymentType,
    //     } = values;

    //     const user = await User.findById(req.user);

    //     const orderData = {
    //       tax,
    //       items,
    //       paymentType,
    //       total: amount,
    //       customerId: user._id,
    //       preTaxTotal: subTotal,
    //       expectedDeliveryDate: date,
    //       expectedDeliveryTime: time,
    //       shipping: {
    //         email: user.email,
    //         name: address.name,
    //         city: address.city,
    //         phone: address.phone,
    //         postalCode: address.zip,
    //         country: address.country,
    //         address: address.street1 + address.street2,
    //       },
    //     };
    //     // create a new order
    //     const order = await Order.create(orderData);

    //     if (paymentType === "card") {
    //       let charged: Stripe.Response<Stripe.Charge>;
    //       if (!checkCard && cardCVC && cardNumber && cardYear && cardMonth && cardHolderName) {
    //         const cardToken = await createCardToken({
    //           cardHolderName,
    //           cardNumber,
    //           cardMonth,
    //           cardYear,
    //           cardCVC,
    //           address,
    //         });

    //         if (values.cardSaved) {
    //           const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
    //           charged = await createCharge({ amount, source: card.id, customer: customerId });
    //         } else {
    //           const card = await stripe.customers.createSource(customerId, { source: cardToken.id });
    //           charged = await createCharge({ amount, source: card.id, customer: customerId });
    //           await stripe.customers.deleteSource(customerId, card.id);
    //         }
    //       }

    //       if (card && checkCard) {
    //         charged = await createCharge({ amount, source: card.cardId, customer: customerId });
    //       }

    //       const payment = await Payment.create({
    //         customerId: user._id,
    //         status: charged.status,
    //         gateway: "stripe",
    //         type: charged.payment_method_details.type,
    //         amount: charged.amount / 100,
    //         token: charged.id,
    //         card: {
    //           brand: charged.payment_method_details.card.brand,
    //           panLastFour: charged.payment_method_details.card.last4,
    //           expirationMonth: charged.payment_method_details.card.exp_month,
    //           expirationYear: charged.payment_method_details.card.exp_year,
    //         },
    //       });

    //       await Order.findByIdAndUpdate(
    //         { _id: order._id },
    //         { paymentId: payment._id, paymentStatus: payment.status },
    //         { new: true, upsert: true }
    //       );
    //     }

    //     // decrement the product stock
    //     items.forEach(async (item: { productId: string; quantity: number }) => {
    //       const product = await Product.findOne({ _id: item.productId });
    //       const newQuantity = product.skus[0].quantity - item.quantity;
    //       product.skus[0].quantity = newQuantity;

    //       await Product.updateOne({ _id: product._id }, { $set: product });
    //     });

    //     return res.status(201).json({ message: "Order created Successfully" });
    //   } catch (error) {
    //     throw new Error(error.message);
    //   }
    // }
}
