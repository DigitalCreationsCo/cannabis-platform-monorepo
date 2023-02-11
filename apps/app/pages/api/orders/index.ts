import axios from 'axios';
import { authMiddleware, ExtendRequest, healthCheckMiddleware } from 'middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import NodeCache from 'node-cache';
import { getUserInfo, urlBuilder } from 'utils';

const cache = new NodeCache({ stdTTL: 30 });
const handler = nc();
handler.use(authMiddleware).use(healthCheckMiddleware);
// get orders from an organization
handler.get(async (req: ExtendRequest, res: NextApiResponse) => {
    try {
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        const { user } = getUserInfo({ req });
        const { organizationId } = user.memberships[0];
        req.organizationId = organizationId;
        if (cache.has(`orders/org/${organizationId}`)) {
            const orders = cache.get(`orders/org/${organizationId}`);
            return res.status(200).json(orders);
        }
        const { data } = await axios(urlBuilder.main.ordersByOrgId(organizationId));
        cache.set(`orders/org/${organizationId}`, data);
        return res.status(res.statusCode).json(data);
    } catch (error) {
        console.error(error.message);
        return res.json(error);
    }
});

// handler.use(adminMiddleware);

// create a order route
// handler.post(async (req: ExtendRequest, res: NextApiResponse) => {
//   try {
//     const { values, customerId, amount, tax, items, subTotal } = req.body;

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
// });

// // create card token
// function createCardToken(card: any) {
//   return stripe.tokens.create({
//     card: {
//       name: card.cardHolderName,
//       number: card.cardNumber,
//       exp_month: card.cardMonth,
//       exp_year: card.cardYear,
//       cvc: card.cardCVC,
//       address_country: card.address.country,
//       address_zip: card.address.zip,
//     },
//   });
// };

// // create charge from card
// function createCharge({ source, amount, customer }) {
//   return stripe.charges.create({
//     source,
//     customer,
//     currency: "USD",
//     amount: Math.round(amount * 100),
//     description: `Charged Amount is ${amount}`,
//   });
// };

// update order
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const update = req.body;
        const { data } = await axios.put(urlBuilder.main.orders(), update);
        return res.status(res.statusCode).json(data);
    } catch (error: any) {
        console.error(error.message);
        return res.json(error);
    }
});

export default handler;
