/* ==========================================
   ICE WORLD
   Main JavaScript File
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("ICE WORLD Website Loaded");

    initNavigation();
    initSmoothScroll();
    initPriceCalculator();
    initScrollButton();

});

/* ==========================================
   Navigation
========================================== */

function initNavigation() {

    const navbar = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("sticky");

        } else {

            navbar.classList.remove("sticky");

        }

    });

}

/* ==========================================
   Smooth Scrolling
========================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function(e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}

/* ==========================================
   Price Calculator
========================================== */

function initPriceCalculator() {

    const blockInput = document.getElementById("blocks");

    const total = document.getElementById("total");

    if(!blockInput || !total)
        return;

    const price = 6;

    function calculate(){

        let quantity = parseInt(blockInput.value);

        if(isNaN(quantity) || quantity < 1){

            quantity = 1;

            blockInput.value = 1;

        }

        const grandTotal = quantity * price;

        total.textContent = "K" + grandTotal.toFixed(2);

    }

    blockInput.addEventListener("input", calculate);

    calculate();

}

/* ==========================================
   Scroll To Top Button
========================================== */

function initScrollButton(){

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.id = "scrollTop";

    document.body.appendChild(button);

    button.style.display = "none";

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){

            button.style.display = "block";

        }else{

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================
   Mobile Menu Placeholder
========================================== */

function toggleMenu(){

    console.log("Mobile menu coming soon.");

}

/* ==========================================
   Loading Screen Placeholder
========================================== */

function hideLoader(){

    console.log("Loader Hidden");

}

/* ==========================================
   Notification Popup
========================================== */

function showMessage(message){

    alert(message);

}

/* ==========================================
   Future Functions
========================================== */

// Firebase Connection

// User Authentication

// Order Submission

// Inventory Tracking

// Delivery Tracking

// Dashboard Analytics

// Reports

// Customer Accounts

// Payment Integration

console.log("ICE WORLD app.js Ready");