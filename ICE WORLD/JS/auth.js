/* ==========================================
   ICE WORLD
   auth.js
   Admin Authentication
========================================== */

/* ==========================================
   Admin Credentials
   (Temporary)
========================================== */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "iceworld123";
const EMPLOYEE_USERNAME = "Keluwa";
const EMPLOYEE_PASSWORD = "2203";
const AUTH_STORAGE_KEY = "iceworld_loggedIn";
const AUTH_USERNAME_KEY = "iceworld_username";

/* ==========================================
   Wait For Page To Load
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if(loginForm){

        loginForm.addEventListener("submit", login);

    }

});

/* ==========================================
   Helper Functions
========================================== */

function isAdminPage(){

    const path = window.location.pathname || "";
    const normalizedPath = path.toLowerCase();

    return normalizedPath.includes("/admin/") ||
           normalizedPath.includes("\\admin\\") ||
           normalizedPath.includes("/admin") ||
           normalizedPath.includes("\\admin");

}

function shouldBypassLoginRedirect(){

    return window.location.protocol === "file:" ||
           window.location.protocol === "about:" ||
           window.location.hostname === "";

}

function getLoginPagePath(){

    return isAdminPage() ? "../login.html" : "login.html";

}

function getDashboardPagePath(){

    return isAdminPage() ? "dashboard.html" : "ADMIN/dashboard.html";

}

function setAuthState(isLoggedIn, username){

    try{

        localStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn ? "true" : "false");
        sessionStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn ? "true" : "false");

        if(username){

            localStorage.setItem(AUTH_USERNAME_KEY, username);
            sessionStorage.setItem(AUTH_USERNAME_KEY, username);

        }
        else{

            localStorage.removeItem(AUTH_USERNAME_KEY);
            sessionStorage.removeItem(AUTH_USERNAME_KEY);

        }

    }
    catch(error){

        console.warn("Auth storage unavailable:", error);

    }

}

function getAuthState(){

    try{

        return sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY) || "false";

    }
    catch(error){

        return localStorage.getItem(AUTH_STORAGE_KEY) || "false";

    }

}

function getStoredUsername(){

    try{

        return sessionStorage.getItem(AUTH_USERNAME_KEY) || localStorage.getItem(AUTH_USERNAME_KEY) || "";

    }
    catch(error){

        return localStorage.getItem(AUTH_USERNAME_KEY) || "";

    }

}

/* ==========================================
   Login Function
========================================== */

function login(event){

    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    if(username === ""){

        alert("Please enter your username.");

        return;

    }

    if(password === ""){

        alert("Please enter your password.");

        return;

    }

    if((username === ADMIN_USERNAME && password === ADMIN_PASSWORD) ||
       (username === EMPLOYEE_USERNAME && password === EMPLOYEE_PASSWORD)){

        setAuthState(true, username);

        window.location.href = getDashboardPagePath();

    }
    else{

        alert("Invalid Username or Password.");

    }

}

/* ==========================================
   Check Login
========================================== */

function checkLogin(){

    return;

}

/* ==========================================
   Logout
========================================== */

function logout(){

    setAuthState(false, "");

    window.location.href = getLoginPagePath();

}

/* ==========================================
   Get Logged In User
========================================== */

function getCurrentUser(){

    return getStoredUsername();

}

/* ==========================================
   Future Firebase Authentication
========================================== */

// firebaseLogin()

// firebaseLogout()

// resetPassword()

// createAdmin()

// updatePassword()

// deleteAdmin()

console.log("Authentication Ready");