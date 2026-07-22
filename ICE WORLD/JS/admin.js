/* ==========================================
   ICE WORLD
   admin.js
========================================== */

const ADMIN_ORDERS_KEY = "iceworld_orders";

document.addEventListener("DOMContentLoaded", () => {

    console.log("Admin Dashboard Loaded");

    checkLogin();

    loadDashboard();

    loadOrders();

});

/* ==========================================
   Load Dashboard
========================================== */

function loadDashboard(){

    loadStatistics();

    loadRecentOrders();

    displayAdminName();

}

/* ==========================================
   Display Logged In User
========================================== */

function displayAdminName(){

    const adminName = document.getElementById("adminName");

    if(adminName){

        adminName.textContent = getCurrentUser();

    }

}

/* ==========================================
   Dashboard Statistics
========================================== */

function loadStatistics(){

    // Temporary Values

    const pendingOrders = 12;

    const completedOrders = 36;

    const blocksSold = 248;

    const revenue = 1488;

    updateCard("pendingOrders", pendingOrders);

    updateCard("completedOrders", completedOrders);

    updateCard("blocksSold", blocksSold);

    updateCard("revenue", "K" + revenue);

}

/* ==========================================
   Update Dashboard Card
========================================== */

function updateCard(id,value){

    const element = document.getElementById(id);

    if(element){

        element.textContent = value;

    }

}

/* ==========================================
   Recent Orders
========================================== */

function loadRecentOrders(){

    const table = document.getElementById("recentOrders");

    if(!table) return;

    const orders = getStoredOrders();

    table.innerHTML = "";

    if(orders.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="5">No orders yet.</td>

        </tr>

        `;

        return;

    }

    orders.slice(0, 5).forEach(order => {

        table.innerHTML += `

        <tr>

            <td>${order.orderID}</td>

            <td>${order.customerName}</td>

            <td>${order.blocks}</td>

            <td>K${order.total}</td>

            <td>${order.status}</td>

        </tr>

        `;

    });

}

function loadOrders(){

    const table = document.getElementById("ordersTable");

    if(!table) return;

    const orders = getStoredOrders();

    table.innerHTML = "";

    if(orders.length === 0){

        table.innerHTML = `

        <tr>

            <td colspan="8">No orders yet.</td>

        </tr>

        `;

        return;

    }

    orders.forEach(order => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${escapeHtml(order.orderID || "")}</td>
            <td>${escapeHtml(order.customerName || "")}</td>
            <td>${escapeHtml(order.phone || "")}</td>
            <td>${escapeHtml(order.blocks || 0)}</td>
            <td>K${escapeHtml(order.total || 0)}</td>
            <td>${escapeHtml(order.deliveryDate || "-")}</td>
            <td>${escapeHtml(order.status || "Pending")}</td>
            <td class="order-actions"></td>

        `;

        const actionsCell = row.querySelector(".order-actions");

        const printBtn = document.createElement("button");
        printBtn.type = "button";
        printBtn.className = "btn btn-outline";
        printBtn.textContent = "Print Invoice";
        printBtn.addEventListener("click", () => printOrderInvoice(order));

        const updateBtn = document.createElement("button");
        updateBtn.type = "button";
        updateBtn.className = "btn";
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => updateOrderStatus(order.orderID));

        actionsCell.appendChild(printBtn);
        actionsCell.appendChild(updateBtn);

        table.appendChild(row);

    });

}

function getStoredOrders(){

    try{

        const orders = localStorage.getItem(ADMIN_ORDERS_KEY);

        return orders ? JSON.parse(orders) : [];

    }
    catch(error){

        return [];

    }

}

function saveOrder(order){

    const orders = getStoredOrders();

    orders.unshift(order);

    localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));

    if(typeof loadRecentOrders === "function"){

        loadRecentOrders();

    }

    if(typeof loadOrders === "function"){

        loadOrders();

    }

}

function printOrderInvoice(order){

    const printWindow = window.open('', '', 'width=800,height=900');

    if(!printWindow){

        alert("Please allow pop-ups to print the invoice.");

        return;

    }

    const html = `
        <html>
            <head>
                <title>ICE WORLD Invoice</title>
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
                            <div>Premium Block Ice Supplier</div>
                        </div>
                        <div><strong>Invoice</strong><br>${escapeHtml(order.orderID || "")}</div>
                    </div>
                    <div class="meta">
                        <div><strong>Customer:</strong> ${escapeHtml(order.customerName || "")}</div>
                        <div><strong>Phone:</strong> ${escapeHtml(order.phone || "")}</div>
                        <div><strong>Address:</strong> ${escapeHtml(order.address || "")}</div>
                    </div>
                    <div class="row"><span>Order Date</span><strong>${escapeHtml(order.orderDate || "")}</strong></div>
                    <div class="row"><span>Delivery Date</span><strong>${escapeHtml(order.deliveryDate || "Not specified")}</strong></div>
                    <div class="row"><span>Delivery Time</span><strong>${escapeHtml(order.deliveryTime || "Not specified")}</strong></div>
                    <div class="row"><span>Blocks</span><strong>${escapeHtml(order.blocks || 0)}</strong></div>
                    <div class="row"><span>Status</span><strong>${escapeHtml(order.status || "Pending")}</strong></div>
                    <div class="row"><span>Notes</span><strong>${escapeHtml(order.notes || "None")}</strong></div>
                    <div class="total"><span>Total</span><span>K${escapeHtml(order.total || 0)}</span></div>
                    <div class="footer">
                        Thank you for ordering from ICE WORLD.<br>
                        Please contact us on 71001981 for any enquiries.
                    </div>
                </div>
            </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);

}

function updateOrderStatus(orderID){

    const orders = getStoredOrders();

    const order = orders.find(item => item.orderID === orderID);

    if(order){

        order.status = order.status === "Pending" ? "Delivered" : "Pending";
        localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
        loadOrders();
        loadRecentOrders();
    }

}

function escapeHtml(value){

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");

}

/* ==========================================
   Refresh Dashboard
========================================== */

function refreshDashboard(){

    loadDashboard();

}

/* ==========================================
   Search Orders
========================================== */

function searchOrders(){

    console.log("Search Function Coming Soon");

}

/* ==========================================
   Filter Orders
========================================== */

function filterOrders(status){

    console.log("Filtering:",status);

}

/* ==========================================
   Dashboard Buttons
========================================== */

function viewOrders(){

    window.location.href="orders.html";

}

function viewCustomers(){

    window.location.href="customers.html";

}

function viewReports(){

    window.location.href="reports.html";

}

function viewSettings(){

    window.location.href="settings.html";

}

/* ==========================================
   Logout
========================================== */

function logoutAdmin(){

    logout();

}

/* ==========================================
   Future Firebase Functions
========================================== */

// loadOrders()

// updateOrderStatus()

// deleteOrder()

// calculateRevenue()

// generateReports()

// exportCSV()

// exportPDF()

// inventory()

// analytics()

console.log("Admin.js Ready");