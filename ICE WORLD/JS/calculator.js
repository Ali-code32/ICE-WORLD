/* ==========================================
   ICE WORLD
   Price Calculator
========================================== */

// Price Per Block Ice
const PRICE_PER_BLOCK = 6;

// Get HTML Elements
const blockInput = document.getElementById("blocks");
const totalPrice = document.getElementById("total");
const totalBlocks = document.getElementById("totalBlocks");
const priceDisplay = document.getElementById("pricePerBlock");
const orderSummary = document.getElementById("orderSummary");

// Initialize Calculator
document.addEventListener("DOMContentLoaded", () => {

    startCalculator();

});

// Main Function
function startCalculator(){

    if(!blockInput) return;

    // Display current price
    if(priceDisplay){
        priceDisplay.textContent = "K" + PRICE_PER_BLOCK.toFixed(2);
    }

    // Calculate immediately
    calculateOrder();

    // Update when quantity changes
    blockInput.addEventListener("input", calculateOrder);

}

// Calculate Total
function calculateOrder(){

    let blocks = parseInt(blockInput.value);

    if(isNaN(blocks) || blocks < 1){

        blocks = 1;

        blockInput.value = 1;

    }

    const total = blocks * PRICE_PER_BLOCK;

    // Display Total Price
    if(totalPrice){

        totalPrice.textContent = "K" + total.toFixed(2);

    }

    // Display Total Blocks
    if(totalBlocks){

        totalBlocks.textContent = blocks;

    }

    // Update Summary
    if(orderSummary){

        orderSummary.innerHTML = `

            <strong>Order Summary</strong><br><br>

            Block Ice : ${blocks}<br>

            Price Per Block : K${PRICE_PER_BLOCK.toFixed(2)}<br>

            Total : <strong>K${total.toFixed(2)}</strong>

        `;

    }

}

// Increase Blocks
function increaseBlocks(){

    if(!blockInput) return;

    blockInput.value++;

    calculateOrder();

}

// Decrease Blocks
function decreaseBlocks(){

    if(!blockInput) return;

    if(blockInput.value > 1){

        blockInput.value--;

    }

    calculateOrder();

}

// Reset Calculator
function resetCalculator(){

    if(!blockInput) return;

    blockInput.value = 1;

    calculateOrder();

}

// Get Total Price
function getTotalPrice(){

    const blocks = parseInt(blockInput.value);

    return blocks * PRICE_PER_BLOCK;

}

// Get Total Blocks
function getTotalBlocks(){

    return parseInt(blockInput.value);

}

console.log("Calculator Loaded Successfully");