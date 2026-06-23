import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log(
      "SUCCESS URL DEBUG:",
      `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_creation: "always",
      customer_email: undefined,
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      metadata: {
        source: "ivelia-pack",
        items: JSON.stringify(
          items.map((item: any) => ({
            name: item.name,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          })),
        ),
      },
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            description: item.color ? `Colour: ${item.color}` : undefined,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
    });

    console.log("CHECKOUT SESSION URL:", session.url);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
