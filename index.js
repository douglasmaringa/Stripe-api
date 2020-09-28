const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_LQ7kUSQKXdfMSVm2MwpGczgS00QjrRZswN");

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received BOOM!! FOR THIS AMOUNT", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK, created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
