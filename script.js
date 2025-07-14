// script.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase-config.js";

// Show form only after login
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
  }
});

// Sign Up
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Sign-up successful!"))
    .catch((error) => alert("Error: " + error.message));
}

// Log In
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      document.getElementById("form-section").style.display = "block";
      document.getElementById("auth-section").style.display = "none";
    })
    .catch((error) => alert("Error: " + error.message));
}

// Simulated Gemini response
function findCommunities() {
  const interests = document.getElementById("interests").value.toLowerCase();
  const skills = document.getElementById("skills").value.toLowerCase();
  const hobbies = document.getElementById("hobbies").value.toLowerCase();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h3>Recommended Communities:</h3>";

  const dummyData = [
    {
      name: "AI & Coding Club",
      address: "Tech Park, Mumbai",
      phone: "+91 98765 43210",
      event: "Hackathon - July 25"
    },
    {
      name: "Photography & Art Group",
      address: "Art Street, Pune",
      phone: "+91 91234 56789",
      event: "Photo Walk - Aug 2"
    },
    {
      name: "Chess & Board Games Circle",
      address: "Library Lane, Delhi",
      phone: "+91 99887 77665",
      event: "Chess Tournament - July 30"
    }
  ];

  const matched = dummyData.filter((item) =>
    item.name.toLowerCase().includes(interests) ||
    item.name.toLowerCase().includes(skills) ||
    item.name.toLowerCase().includes(hobbies)
  );

  if (matched.length === 0) {
    resultsDiv.innerHTML += "<p>No matching communities found.</p>";
  } else {
    matched.forEach(item => {
      resultsDiv.innerHTML += `
        <div class="result-card">
          <strong>${item.name}</strong><br>
          📍 ${item.address}<br>
          📞 ${item.phone}<br>
          📅 Event: ${item.event}
        </div>
      `;
    });
  }
}

window.signup = signup;
window.login = login;
window.findCommunities = findCommunities;

