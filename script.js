class Password {
  constructor(length) {
    this.length = length;
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  generatePassword() {
    let password = "";
    const randomLower =
      this.lowercaseChars[
        Math.floor(Math.random() * this.lowercaseChars.length)
      ];
    const randomUpper =
      this.uppercaseChars[
        Math.floor(Math.random() * this.uppercaseChars.length)
      ];
    const randomSpecial =
      this.specialChars[Math.floor(Math.random() * this.specialChars.length)];

    password += randomLower + randomUpper + randomSpecial;

    const remainingLength = this.length - 3;
    const allChars =
      this.lowercaseChars + this.uppercaseChars + this.specialChars;

    for (let i = 0; i < remainingLength; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      password += randomChar;
    }

    password = this.shufflePassword(password);

    return password;
  }

  shufflePassword(password) {
    const passwordArray = password.split("");
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [
        passwordArray[j],
        passwordArray[i],
      ];
    }
    return passwordArray.join("");
  }
}

document.getElementById("generate-btn").addEventListener("click", function () {
  const length = document.getElementById("passwordLength").value;
  const passwordGenerator = new Password(length);
  const generatedPassword = passwordGenerator.generatePassword();
  document.getElementById("generated-password").textContent =
    "Generated Password: " + generatedPassword;
  showMessage("Password generated!");
});

document.getElementById("copy-btn").addEventListener("click", function () {
  const generatedPassword =
    document.getElementById("generated-password").textContent;
  if (generatedPassword) {
    copyToClipboard(generatedPassword.replace("Generated Password: ", ""));
    showMessage("Password copied to clipboard!");
  } else {
    showMessage("No password generated yet.");
  }
});

document
  .getElementById("passwordLength")
  .addEventListener("input", function () {
    const length = document.getElementById("passwordLength").value;
    document.getElementById("lengthLabel").textContent =
      "Password Length: " + length;
  });

function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  setTimeout(function () {
    messageElement.textContent = "";
  }, 3000);
}
