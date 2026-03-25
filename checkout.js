import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {

const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],

line_items: [{
price_data:{
currency:'usd',
product_data:{name:'Product'},
unit_amount:1000
},
quantity:1
}],

mode:'payment',

success_url:'https://yourdomain.com/success',
cancel_url:'https://yourdomain.com/cancel'
})

res.json({ url: session.url })
}