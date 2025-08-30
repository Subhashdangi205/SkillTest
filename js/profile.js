// profile.js
// Loads profile data, shows history, allows simple edit (name + photo) and sign out.
// This file expects profile.html structure from earlier.

const sessionKey = "qa_currentUser";
const usersKey = "qa_users";

function requireLogin() {
  const email = localStorage.getItem(sessionKey);
  if (!email) {
    // Not logged in -> go to index
    window.location.href = "index.html";
    return null;
  }
  return email;
}

function getUsers() {
  const raw = localStorage.getItem(usersKey);
  return raw ? JSON.parse(raw) : {};
}
function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

// Load profile data into DOM
function loadProfile() {
  const email = requireLogin();
  if (!email) return;

  const users = getUsers();
  const user = users[email];
  if (!user) {
    logout(); // fallback
    return;
  }

  // set name and photo
  const nameEl = document.getElementById("profileName");
  const picEl = document.getElementById("profilePic");
  nameEl.textContent = user.name || "User";
  picEl.src = user.photo || "assets/default.png";

  // populate history list and simple aggregated stats
  const historyUl = document.getElementById("testHistory");
  historyUl.innerHTML = "";

  if (!user.history || user.history.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = "No test history yet. Start a test!";
    historyUl.appendChild(li);
  } else {
    // Show latest 10 attempts (most recent first)
    const recent = user.history.slice().reverse();
    recent.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-start";
      li.innerHTML = `
        <div>
          <strong>${item.language}</strong> — Score: ${item.score}/${item.total} 
          <div class="small text-muted">Time: ${item.timeTakenSec}s • ${new Date(item.date).toLocaleString()}</div>
        </div>
        <div class="text-end small">${item.passed ? '<span class="badge bg-success">Passed</span>' : '<span class="badge bg-secondary">Attempt</span>'}</div>
      `;
      historyUl.appendChild(li);
    });
  }

  // also show aggregated per-language stats below the list (simple)
  renderLanguageStats(user.history || []);
}

// Render aggregated stats: attempts per language
function renderLanguageStats(history) {
  // remove previous if exists
  const existing = document.getElementById("langStats");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "langStats";
  container.className = "mt-3";

  if (!history || history.length === 0) {
    container.innerHTML = `<p class="text-muted small">No stats yet.</p>`;
    document.querySelector(".card").appendChild(container);
    return;
  }

  const map = {};
  history.forEach(h => {
    if (!map[h.language]) map[h.language] = {count: 0, best: 0, totalTime: 0};
    map[h.language].count++;
    map[h.language].best = Math.max(map[h.language].best, h.score);
    map[h.language].totalTime += (h.timeTakenSec || 0);
  });

  let html = `<h6 class="mt-3">Per-language stats</h6><div class="row">`;
  for (const lang in map) {
    const item = map[lang];
    const avgTime = Math.round(item.totalTime / item.count);
    html += `
      <div class="col-6">
        <div class="p-2 border rounded mb-2">
          <strong>${lang}</strong>
          <div class="small text-muted">Attempts: ${item.count}</div>
          <div class="small text-muted">Best score: ${item.best}</div>
          <div class="small text-muted">Avg time: ${avgTime}s</div>
        </div>
      </div>
    `;
  }
  html += `</div>`;

  container.innerHTML = html;
  document.querySelector(".card").appendChild(container);
}

// Edit profile: prompt for new name and choose photo
function editProfile() {
  const email = requireLogin();
  if (!email) return;
  const users = getUsers();
  const user = users[email];

  const newName = prompt("Enter new name:", user.name || "");
  if (newName === null) return; // cancelled
  user.name = newName.trim() || user.name;

  // ask for photo file via input
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      saveUsers(users);
      loadProfile();
      return;
    }
    const reader = new FileReader();
    reader.onload = function(ev) {
      user.photo = ev.target.result; // dataURL
      users[email] = user;
      saveUsers(users);
      loadProfile();
      alert("Profile updated.");
    };
    reader.readAsDataURL(file);
  };
  // trigger file chooser
  fileInput.click();

  // if user cancels file selection, still save name change
  users[email] = user;
  saveUsers(users);
  loadProfile();
}

// logout helper
function logout() {
  localStorage.removeItem(sessionKey);
  window.location.href = "index.html";
}

// expose editProfile in global scope because HTML calls it
window.editProfile = editProfile;
window.logout = logout;

// On page load
document.addEventListener("DOMContentLoaded", loadProfile);
