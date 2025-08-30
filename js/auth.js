// auth.js

// Keys for localStorage
const usersKey = "qa_users";        
const sessionKey = "qa_currentUser";  

// Utility: get users object from localStorage
function getUsers() {
  const raw = localStorage.getItem(usersKey);
  return raw ? JSON.parse(raw) : {};
}

// Utility: save users object to localStorage
function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

// Get current user object
function getCurrentUser() {
  const email = localStorage.getItem(sessionKey);
  if (!email) return null;
  const users = getUsers();
  return users[email] || null;
}

// ---------------- REGISTER ----------------
const registerForm = document.querySelector("#registerForm .btn-primary");
if (registerForm) {
  registerForm.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const errorMsg = document.getElementById("registerError");

    if (!name || !email || !password) {
      errorMsg.textContent = "⚠ Please fill all fields.";
      return;
    }

    const users = getUsers();
    if (users[email]) {
      errorMsg.textContent = "⚠ User already exists. Please login.";
      return;
    }

    // create user object
    users[email] = { name, email, password, photo: null, history: [] };
    saveUsers(users);

    errorMsg.style.color = "#00ff00";
    errorMsg.textContent = "✅ Registration successful! Please login now.";

    // Reset fields
    document.getElementById("regName").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";

    // slide back to login
    setTimeout(showLogin, 1000);
  });
}

// ---------------- LOGIN ----------------
const loginForm = document.querySelector("#loginForm .btn-primary");
if (loginForm) {
  loginForm.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("loginError");

    const users = getUsers();
    const user = users[email];
    if (!user || user.password !== password) {
      errorMsg.textContent = "❌ Invalid credentials.";
      return;
    }

    // set session
    localStorage.setItem(sessionKey, email);

    // redirect to profile (replace with your profile page if any)
    // alert(`✅ Welcome ${user.name}!`);
    window.location.href = "profile.html";

    // window.location.href = "profile.html"; // uncomment if profile.html exists
  });
}

// ---------------- FORM TOGGLE ----------------
function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.classList.add("fly-out");
  setTimeout(() => {
    loginForm.classList.add("hidden");
    loginForm.classList.remove("fly-in", "fly-out");

    registerForm.classList.remove("hidden");
    registerForm.classList.add("fly-in");
  }, 600);
}

function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  registerForm.classList.add("fly-out");
  setTimeout(() => {
    registerForm.classList.add("hidden");
    registerForm.classList.remove("fly-in", "fly-out");

    loginForm.classList.remove("hidden");
    loginForm.classList.add("fly-in");
  }, 600);
}

// ---------------- AUTO REDIRECT IF LOGGED IN ----------------
window.addEventListener("load", () => {
  const current = getCurrentUser();
  if (current) {
    // alert(`✅ Already logged in as ${current.name}`);
    // window.location.href = "profile.html"; // uncomment if profile.html exists
  }
});

// ---------------- LOGOUT ----------------
function logout() {
  localStorage.removeItem(sessionKey);
  window.location.href = "index.html";
}
