
// Get HTML elements
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const strengthText = document.getElementById("strengthText");
const strengthIndicator = document.getElementById("strengthIndicator");

const matchMessage = document.getElementById("matchMessage");
const resetBtn = document.getElementById("resetBtn");


// Get requirement elements
const lengthCheck = document.getElementById("length");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");


// Function to check password strength
function checkPassword() {

    let pass = password.value;

    // If password is empty
    if (pass.length === 0) {

        strengthText.textContent = "Enter a password to check strength";

        strengthIndicator.style.width = "0%";
        strengthIndicator.className = "";

        resetRequirements();
        checkMatch();

        return;
    }

    // Check all five conditions
    let hasLength = pass.length >= 8;
    let hasUppercase = /[A-Z]/.test(pass);
    let hasLowercase = /[a-z]/.test(pass);
    let hasNumber = /[0-9]/.test(pass);
    let hasSpecial = /[^A-Za-z0-9]/.test(pass);

    // Update requirement checklist
    updateRequirement(lengthCheck, hasLength);
    updateRequirement(uppercaseCheck, hasUppercase);
    updateRequirement(lowercaseCheck, hasLowercase);
    updateRequirement(numberCheck, hasNumber);
    updateRequirement(specialCheck, hasSpecial);

    // Count satisfied conditions
    let score = 0;

    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Determine password strength
    if (score <= 2) {

        strengthText.textContent = "❌ Weak Password";

        strengthIndicator.style.width = "33%";
        strengthIndicator.className = "weak";

    }

    else if (score <= 4) {

        strengthText.textContent = "⚠️ Medium Password";

        strengthIndicator.style.width = "66%";
        strengthIndicator.className = "medium";

    }

    else {

        strengthText.textContent = "✅ Strong Password!";

        strengthIndicator.style.width = "100%";
        strengthIndicator.className = "strong";

    }

    // Check confirm password
    checkMatch();
}


// Function to update checklist
function updateRequirement(element, condition) {

    if (condition) {

        element.textContent = "✔️ " + element.textContent.substring(2);
        element.classList.add("valid");

    } else {

        element.textContent = "❌ " + element.textContent.substring(2);
        element.classList.remove("valid");

    }
}


// Function to reset all checklist items
function resetRequirements() {

    updateRequirement(lengthCheck, false);
    updateRequirement(uppercaseCheck, false);
    updateRequirement(lowercaseCheck, false);
    updateRequirement(numberCheck, false);
    updateRequirement(specialCheck, false);

}


// Function to check password matching
function checkMatch() {

    let pass = password.value;
    let confirm = confirmPassword.value;

    if (confirm === "") {

        matchMessage.textContent = "";
        matchMessage.className = "";

    }

    else if (pass === confirm) {

        matchMessage.textContent = "✅ Passwords Match!";
        matchMessage.className = "match";

    }

    else {

        matchMessage.textContent = "❌ Passwords Do Not Match!";
        matchMessage.className = "mismatch";

    }

}


// Show / Hide Password functionality
togglePassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        password.type = "password";
        togglePassword.textContent = "Show";

    }

});


// Live password checking
password.addEventListener("input", checkPassword);


// Check matching while typing
confirmPassword.addEventListener("input", checkMatch);


// Reset button functionality
resetBtn.addEventListener("click", function() {

    // Clear both input fields
    password.value = "";
    confirmPassword.value = "";

    // Reset password visibility
    password.type = "password";
    togglePassword.textContent = "Show";

    // Reset strength message
    strengthText.textContent = "Password strength will appear here";

    // Reset strength bar
    strengthIndicator.style.width = "0%";
    strengthIndicator.className = "";

    // Reset checklist
    resetRequirements();

    // Clear match message
    matchMessage.textContent = "";
    matchMessage.className = "";

});
