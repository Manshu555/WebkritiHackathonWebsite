const runCodeButton = document.querySelector(".editor .btn");


// Rules and Regulations
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.rules-list li');

    items.forEach(item => {
        item.addEventListener('mouseover', () => {
            // Show content on hover
            item.classList.add('active');
        });

        item.addEventListener('mouseout', () => {
            // Hide content when not hovering
            item.classList.remove('active');
        });
    });
});


// navbar

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('nav ul');
    const navToggleLabel = document.querySelector('.nav-toggle-label');

    function closeMenu() {
        navToggle.checked = false;
    }

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggleLabel.contains(event.target) && !navToggle.contains(event.target)) {
            closeMenu();
        }
    });

    navMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    navToggleLabel.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});


//login


document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("Users");

    // Select the nav item that points to the login page
    const loginNavItem = document.querySelector("nav ul li a[href='login.html']");

    if (storedUser) {
        // User is logged in, change "Login" to "Logout"
        if (loginNavItem) {
            loginNavItem.textContent = "Logout";
            loginNavItem.href = "#"; // Prevent navigation to login page

            // Add click event listener for logout
            loginNavItem.addEventListener("click", () => {
                const confirmed = window.confirm("Are you sure you want to log out?");
                if (confirmed) {
                    localStorage.removeItem("Users");
                    alert("Logged out successfully.");
                    window.location.reload(); // Reload page to update nav
                }
            });
        }
    } else {
        // Handle Login Form Submission
        const loginForm = document.querySelector("#login-form");
        if (loginForm) {
            loginForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const email = document.querySelector("#login-email").value;
                const password = document.querySelector("#login-password").value;

                const userInfo = { email, password };

                try {
                    const response = await axios.post("https://webkritihackathonwebsite.onrender.com/user/login", userInfo);
                    alert("Logged in successfully");
                    localStorage.setItem("Users", JSON.stringify(response.data.user));
                    window.location.href = "participant-form.html"; // Redirect after login
                } catch (err) {
                    const errorMessage = err.response?.data?.message || "Incorrect username or password.";
                    alert("Login Error: " + errorMessage);
                }
            });
        }
    }
});


// signup

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("Users");

    // Remove "Sign Up" nav item if user is logged in
    const signupNavItem = document.querySelector("nav ul li a[href='signup.html']");
    if (signupNavItem) {
        if (storedUser) {
            signupNavItem.parentElement.remove(); // Remove the parent <li> element
        }
    }

    // Handle Sign-Up Form Submission
    const signupForm = document.querySelector("#signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const fullname = document.querySelector("#signup-name").value;
            const email = document.querySelector("#signup-email").value;
            const password = document.querySelector("#signup-password").value;

            const userInfo = { fullname, email, password };

            try {
                const response = await axios.post("https://webkritihackathonwebsite.onrender.com/user/signup", userInfo);
                alert("Signup successful");
                localStorage.setItem("Users", JSON.stringify(response.data.user));
                // Optionally redirect or handle UI update after successful signup
                // Example: window.location.href = "/Webakriti/rules.html"; // Redirect after signup
            } catch (err) {
                if (err.response) {
                    const errorMessage = err.response.data.message || "An unknown error occurred.";
                    alert("Signup Error: " + errorMessage);
                } else {
                    console.error("Error:", err);
                    alert("A network error occurred. Please try again later.");
                }
            }
        });
    }
});


// particpant form
document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem("Users");

    // Select the nav item that points to the login page
    const loginNavItem = document.querySelector("nav ul li a[href='login.html']");

    if (storedUser) {
        // User is logged in, change "Login" to "Logout"
        if (loginNavItem) {
            loginNavItem.textContent = "Logout";
            loginNavItem.href = "participant-form.html"; // Prevent navigation to login page

            // Add click event listener for logout
            loginNavItem.addEventListener("click", () => {
                const confirmed = window.confirm("Are you sure you want to log out?");
                if (confirmed) {
                    localStorage.removeItem("Users");
                    alert("Logged out successfully.");
                    window.location.reload(); // Reload page to update nav
                }
            });
        }

        // Add "Participant Form" to the navbar if user is logged in
        const navMenu = document.querySelector("nav ul");
        if (navMenu) {
            const participantFormNavItem = document.createElement("li");
            const participantFormLink = document.createElement("a");
            participantFormLink.href = "participant-form.html";
            participantFormLink.textContent = "Participant Form";
            participantFormNavItem.appendChild(participantFormLink);
            navMenu.appendChild(participantFormNavItem);
        }
    }
});

