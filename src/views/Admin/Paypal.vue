<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow-lg p-4 text-center" style="max-width: 450px; width: 100%;">
      <h4 class="mb-3">Checkout with PayPal</h4>
      <p class="text-muted mb-4">Secure payment for your order</p>

      <!-- Order summary -->
      <ul class="list-group mb-4 text-start">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>Product Name</span>
          <strong>$100.00</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>Service Fee</span>
          <strong>$0.00</strong>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>Total</span>
          <strong class="text-success">$100.00</strong>
        </li>
      </ul>

      <!-- PayPal Button -->
      <div id="paypal-button-container" class="w-100"></div>

      <!-- Extra footer -->
      <p class="small text-muted mt-3 mb-0">
        Payments are securely processed by PayPal
      </p>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // ✅ Load PayPal SDK dynamically if not already loaded
  if (!document.getElementById("paypal-sdk")) {
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = "https://www.sandbox.paypal.com/sdk/js?client-id=AUxYSyXd8mBvRwG2EL1DEOb3-Dw2ja1clBSJ-DMmkzYg_ekMipx5IS8LRdI34sud_GmnpsxMnnySMGzy&currency=USD";
    script.onload = () => initPayPalButton();
    document.body.appendChild(script);
  } else {
    initPayPalButton();
  }

  function initPayPalButton() {
    paypal.Buttons({

      // ✅ Create PayPal Order
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: "3.00",
              breakdown: {
                item_total: { currency_code: "USD", value: "3.00" }
              }
            },
            payee: {
              merchant_id: "ZGGLLH2H4DJKL" // Verified
              // merchant_id: "AS73ND7SNXJEJ" // Unverified
            },
            description: "Purchase of services for invoice #INV-00123",
            custom_id: "ORDER_67",
            invoice_id: "INV_67",
            items: [
              {
                name: "Service Deposit",
                description: "Initial deposit for estimate #EST-123",
                unit_amount: {
                  currency_code: "USD",
                  value: "3.00"
                },
                quantity: "1"
              }
            ]
          }]
        });
      },

      // ✅ On Payment Approval
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          if (details.status === "COMPLETED") {
            console.log("✅ Transaction completed by " + details.payer.name.given_name);
            console.log("Payment Success:", details);

            // 👉 Send order details to your server
            // fetch("/paypal/capture", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ orderID: data.orderID, details: details })
            // });
          } else {
            console.log("❌ Payment not successful. Status: " + details.status);
          }
        });
      },

      // ✅ Handle Errors
      onError: function (err) {
        console.error("❌ PayPal Error: " +err);
      }

    }).render("#paypal-button-container");
  }
});
</script>
