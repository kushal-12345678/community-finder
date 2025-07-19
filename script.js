// script.js

// Access Firebase from global window object
const {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} = window.firebase;

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
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("You've already signed up with this email. Please click on Log In instead.");
      } else {
        alert("Error: " + error.message);
      }
    });
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

// Find communities (Gemini simulation)
function findCommunities() {
  const city = document.getElementById("city").value.toLowerCase();
  const interests = document.getElementById("interests").value.toLowerCase();
  const skills = document.getElementById("skills").value.toLowerCase();
  const hobbies = document.getElementById("hobbies").value.toLowerCase();
  
  //prevent searching if no city is selected
  if (!city) {
    alert("Please select your city before searching.");
    return;
  }
   
  //prevent searching if no field is selected
  if (!interests && !skills && !hobbies) {
    alert("Please enter at least one field (interest, skill, or hobby).");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<h3>Recommended Communities:</h3>";

  const dummyData = [
    {
      name: "AI & Coding Club",
      address: "Wadivadi, Vadodara",
      phone: "+91 98765 43210",
      event: "Hackers-meetup - July 25"
    },
    {
      name: "Ahemdabad Art Society",
      address: "Helmet Circle, Ahmedabad",
      phone: "+91 91234 56789",
      event: "Photo Walk - Aug 2"
    },
    {
      name: "Chess & Board Games Circle",
      address: "Library Lane, Ahmedabad",
      phone: "+91 99887 77665",
      event: "Chess Tournament - July 30"
    },
    {
      name: "Cricket & Flutter Group",
      address: "Wagari TP-14, Ahmedabad",
      phone: "+91 99205 19665",
      event: "Cricket Tournament - Aug 23"
    },
    {
      name: "Tennis lovers",
      address: "Akota Tennis Academy, Vadodara ",
      phone: "+91 84561 20232",
      event: "Tennis Tournament - Aug 30"
    },
    {
      name: "Chess Group",
      address: "Bardoa Chess Club, Vadodara",
      phone: "+91 94247 50311",
      event: "Chess Tournament - Sept 5"
    },
    {
      name: "Group Musicaa",
      address: "Manek chowk, Ahmedabad",
      phone: "+91 78620 31456",
      event: "Live Jam - Sept 10"
    },
  ];

  const matched = dummyData.filter((item) =>
    item.address.toLowerCase().includes(city) && 
   (
    item.name.toLowerCase().includes(interests) ||
    item.name.toLowerCase().includes(skills) ||
    item.name.toLowerCase().includes(hobbies)
   )
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

// Logout
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

// Event listeners (connect UI to logic)
document.getElementById("signup-btn")?.addEventListener("click", signup);
document.getElementById("login-btn")?.addEventListener("click", login);
document.getElementById("logout-btn")?.addEventListener("click", logout);
document.getElementById("find-btn")?.addEventListener("click", findCommunities);
