function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showAlert(type, message) {
  const alert = document.getElementById("alert");
  const alertText = document.querySelector("#alert .alert-title");

  if (alert.classList.contains("hidden")) {
    alert.classList.remove("hidden");
  }
  alert.classList.add(type);
  alertText.textContent = message;
}

function handleHideAlert() {
  const closeButton = document.querySelector("#alert button.close-button");
  closeButton.addEventListener("click", () => {
    const alert = document.getElementById("alert");
    if (!alert.classList.contains("hidden")) {
      alert.classList.add("hidden");
    }
  });
}

async function sendEmail(data) {
  const button = document.querySelector("form button[type='submit']");
  button.textContent = "Sending...";
  button.disabled = true;
  await fetch("https://postmail.invotes.com/send", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        showAlert("error", "Something went wrong");
        return;
      }
      showAlert("success", "Great, I will get back to you soon");
    })
    .catch((error) => {
      console.log(error);
      showAlert("error", "Something went wrong");
    });
  button.textContent = "Send me";
  button.disabled = false;
}

export default function (access_token) {
  const form = document.querySelector("form");
  const name = document.querySelector("input[name='name']");
  const email = document.querySelector("input[name='email']");
  const message = document.querySelector("textarea");

  function handleValidation() {
    if (name.value === "") {
      showAlert("error", "Name is required");
      return false;
    }
    if (!validateEmail(email.value)) {
      showAlert("error", "Email is invalid");
      return false;
    }
    if (message.value === "") {
      showAlert("error", "Message is required");
      return false;
    }
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      handleHideAlert();
      return;
    }

    const data = {
      access_token,
      subject: `Name: ${name.value}, Email: ${email.value}`,
      text: message.value,
    };
    sendEmail(data);
  });
}
