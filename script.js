// script.js
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase-config.js";
import { signOut } from "firebase/auth";

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

  if (!interests && !skills && !hobbies) {
    alert("Please enter at least one field (interest, skill, or hobby).");
    return;
  }

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
    },
    {
      name: "Cricket & Flutter Group",
      address: "Wagari sector, Mumbai",
      phone: "+91 99205 19665",
      event: "Cricket Tournament - Aug 23 "
    },
    {
      name: "Tennis & PlayStation Group",
      address: "Sector-43, Delhi",
      phone: "+91 84561 20232",
      event: "Tennis Tournament - Aug 30"
    },
    {
      name: "Chess Group",
      address: "Kichobad, Kolkata",
      phone: "+91 94247 50311",
      event: "Chess Tournament - Sept 5"
    },
    {
      name: "Group Musicaa",
      address: "Manek chowk, Ahmedabad",
      phone: "+91 78620 31456",
      event: "Chess Tournament - July 30"
    },
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

function logout() {
  signOut(auth)
    .then(() => {
      alert("Logged out!");
      document.getElementById("form-section").style.display = "none";
      document.getElementById("auth-section").style.display = "block";
    })
    .catch((error) => {
      alert("Error logging out: " + error.message);
    });
}

window.signup = signup;
window.login = login;
window.findCommunities = findCommunities;
window.logout = logout;

