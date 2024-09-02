const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
  const sig = req.headers["stripe-signature"];
  const payload = req.body;
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { line_items } = session;

    // Stok güncellemeleri yap
    try {
      const updateStockPromises = line_items.map(async (item) => {
        const productId = item.price.product_data.id;
        const quantity = item.quantity;

        // Ürün modelini import et
        const Product = require('../models/Product'); 

        // Stok güncelle
        await Product.findByIdAndUpdate(productId, {
          $inc: { stock: -quantity }
        });
      });

      await Promise.all(updateStockPromises);
      console.log("Stoklar güncellendi.");
    } catch (error) {
      console.error("Stok güncelleme hatası:", error);
    }
  }

  res.status(200).send({ received: true });
});

module.exports = router;
