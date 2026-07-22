/* ==========================================
   ICE WORLD
   orders.js
========================================== */

const ORDER_PREFIX = "IW";

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("orderForm");

    if(form){

        form.addEventListener("submit", submitOrder);

    }

});

/* ==========================================
   Submit Order
========================================== */

function submitOrder(event){

    event.preventDefault();

    // Get Customer Information

    const customerName = document.getElementById("customerName").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const email = document.getElementById("email").value.trim();

    const address = document.getElementById("address").value.trim();

    const deliveryDate = document.getElementById("deliveryDate").value;

    const deliveryTime = document.getElementById("deliveryTime").value;

    const blocks = parseInt(document.getElementById("blocks").value);

    const notes = document.getElementById("notes").value.trim();

    /* ------------------------------
       Validation
    ------------------------------ */

    if(customerName === ""){

        alert("Please enter your name.");

        return;

    }

    if(phone === ""){

        alert("Please enter your phone number.");

        return;

    }

    if(address === ""){

        alert("Please enter your delivery address.");

        return;

    }

    if(isNaN(blocks) || blocks < 1){

        alert("Invalid quantity.");

        return;

    }

    /* ------------------------------
       Calculate Total
    ------------------------------ */

    const pricePerBlock = 6;

    const total = blocks * pricePerBlock;

    /* ------------------------------
       Generate Order Number
    ------------------------------ */

    const orderID = generateOrderID();

    /* ------------------------------
       Create Order Object
    ------------------------------ */

    const order = {

        orderID,

        customerName,

        phone,

        email,

        address,

        deliveryDate,

        deliveryTime,

        blocks,

        pricePerBlock,

        total,

        notes,

        status: "Pending",

        orderDate: new Date().toLocaleString()

    };

    console.log(order);

    if(typeof saveOrder === "function"){

        saveOrder(order);

    }

    /* ------------------------------
       Firebase Goes Here
    ------------------------------ */

    // saveOrder(order);

    /* ------------------------------
       Success Message
    ------------------------------ */

    const receiptBox = document.getElementById("receiptBox");

    if(receiptBox){

        receiptBox.innerHTML = `

            <div class="receipt-header">
                <div>
                    <h3>ICE WORLD</h3>
                    <p>Order Confirmation</p>
                </div>
                <span class="receipt-status">Pending</span>
            </div>

            <div class="receipt-body">
                <div class="receipt-row">
                    <span>Order ID</span>
                    <strong>${orderID}</strong>
                </div>
                <div class="receipt-row">
                    <span>Customer</span>
                    <strong>${customerName}</strong>
                </div>
                <div class="receipt-row">
                    <span>Phone</span>
                    <strong>${phone}</strong>
                </div>
                <div class="receipt-row">
                    <span>Blocks</span>
                    <strong>${blocks}</strong>
                </div>
                <div class="receipt-row">
                    <span>Delivery Date</span>
                    <strong>${deliveryDate || "Not specified"}</strong>
                </div>
                <div class="receipt-row">
                    <span>Delivery Time</span>
                    <strong>${deliveryTime || "Not specified"}</strong>
                </div>
            </div>

            <div class="receipt-total">
                <span>Total Amount</span>
                <strong>K${total}</strong>
            </div>

            <div class="receipt-footer">
                <p>Thank you for ordering from ICE WORLD.</p>
                <small>We will contact you shortly to confirm your delivery.</small>
                <div class="receipt-actions">
                    <button class="btn btn-small" onclick="window.print()">Print Receipt</button>
                    <button class="btn btn-small btn-outline" onclick="downloadReceipt('${orderID}', '${customerName}', '${phone}', '${blocks}', '${total}', '${deliveryDate || "Not specified"}', '${deliveryTime || "Not specified"}')">Download PDF</button>
                </div>
            </div>

        `;

        receiptBox.style.display = "block";

    }

    document.getElementById("orderForm").reset();

}

/* ==========================================
   Generate Order ID
========================================== */

function generateOrderID(){

    const random = Math.floor(Math.random()*900000)+100000;

    return ORDER_PREFIX + "-" + random;

}

function downloadReceipt(orderID, customerName, phone, blocks, total, deliveryDate, deliveryTime){

    const printWindow = window.open('', '', 'width=800,height=900');

    if(!printWindow){

        alert("Please allow pop-ups to download the PDF receipt.");

        return;

    }

    const html = `
        <html>
            <head>
                <title>ICE WORLD Receipt</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
                    .invoice { border: 1px solid #ddd; padding: 24px; border-radius: 12px; }
                    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
                    .header h1 { margin: 0; font-size: 24px; }
                    .meta { margin: 10px 0 20px; color: #555; }
                    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
                    .total { margin-top: 14px; padding-top: 12px; font-size: 18px; font-weight: bold; }
                    .footer { margin-top: 20px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <div class="header">
                        <div>
                            <h1>ICE WORLD</h1>
                            <div>Invoice / Receipt</div>
                        </div>
                        <div>Order ID: ${orderID}</div>
                    </div>
                    <div class="meta">
                        <div><strong>Company:</strong> ICE WORLD</div>
                        <div><strong>Address:</strong> Gerehu</div>
                        <div><strong>Phone:</strong> 71001981</div>
                        <div><strong>Email:</strong> iceworld@gmail.com.pg</div>
                        <div><strong>Customer:</strong> ${customerName}</div>
                        <div><strong>Phone:</strong> ${phone}</div>
                        <div><strong>Delivery Date:</strong> ${deliveryDate}</div>
                        <div><strong>Delivery Time:</strong> ${deliveryTime}</div>
                    </div>
                    <div class="row"><span>Blocks</span><strong>${blocks}</strong></div>
                    <div class="row"><span>Price per Block</span><strong>K6.00</strong></div>
                    <div class="row"><span>Subtotal</span><strong>K${total}</strong></div>
                    <div class="total"><span>Total</span><strong>K${total}</strong></div>
                    <div class="footer">
                        Thank you for ordering from ICE WORLD.<br>
                        This receipt was generated on ${new Date().toLocaleString()}.
                    </div>
                </div>
            </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

}

/* ==========================================
   Future Functions
========================================== */

// saveOrder()

// updateOrder()

// cancelOrder()

// deleteOrder()

// emailCustomer()

// sendSMS()

// sendWhatsApp()

// printInvoice()

console.log("orders.js Loaded");