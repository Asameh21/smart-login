let input = Array.from(document.querySelectorAll("input"));
let button = document.querySelector("button");

let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

let regex = {
  text: /^(?=.{3,15}$)[A-Za-z]+(([',. -][A-Za-z])?[A-Za-z]*)*$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  email: /^[a-zA-Z0-9]{4,20}@[a-zA-Z]{3,10}\.com$/,
};
let emailExistCheck = false;

input.forEach((ele) =>
  ele.addEventListener("input", (e) => {
    if (window.location.href.endsWith("signUp.html")) {
      if (regex[e.target.type] && regex[e.target.type].test(e.target.value)) {
        if (e.target.type === "email") {
          let emailExists = users.some((user) => user.email === e.target.value);
          if (emailExists) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
            emailExistCheck = true;
          } else {
            e.target.classList.add("is-valid");
            e.target.classList.remove("is-invalid");
          }
        } else {
          e.target.classList.add("is-valid");
          e.target.classList.remove("is-invalid");
        }
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
      }
    }
  })
);

function addUser() {
  let user = {
    name: "",
    email: "",
    password: "",
  };
  input.forEach((ele) => {
    if (ele.type === "text") {
      user.name = ele.value;
    } else if (ele.type === "email") {
      user.email = ele.value;
    } else if (ele.type === "password") {
      user.password = ele.value;
    }
  });
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

let emailIndex;
let userPassword;
function checkEmailLogin() {
  if (window.location.href.endsWith("index.html")) {
    for (let i = 0; i < users.length; i++) {
      if (input[0].value === users[i].email) {
        emailIndex = i;
        return "valid";
      }
    }
    return "not valid";
  }
}

function checkPasswordLogin() {
  if (window.location.href.endsWith("index.html")) {
    if (userPassword === input[1].value) {
      return "valid";
    } else {
      return "not valid";
    }
  }
}
let currentName;
input[0].addEventListener("input", () => {
  if (checkEmailLogin() === "valid") {
    currentName = users[emailIndex].name;
    userPassword = users[emailIndex].password;
  }
});

function checkValid() {
  return input.every((ele) => ele.classList.contains("is-valid"))
    ? "valid"
    : "not valid";
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (button.innerHTML === "Sign Up") {
    if (checkValid() === "valid") {
      addUser();
      window.open("index.html", "_self");
    } else if (checkValid() === "not valid") {
      {
        if (
          input[0].value === "" ||
          input[1].value === "" ||
          input[2].value === ""
        ) {
          document
            .getElementById("inputs-not-completed")
            .classList.remove("d-none");
        } else if (
          input[1].classList.contains("is-invalid") &&
          emailExistCheck === true
        ) {
          document
            .getElementById("inputs-not-completed")
            .classList.add("d-none");

          Swal.fire({
            title: "This email has been already exists",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        } else if (
          input[0].classList.contains("is-invalid") ||
          input[1].classList.contains("is-invalid") ||
          input[2].classList.contains("is-invalid")
        ) {
          emailExistCheck = false;
          document
            .getElementById("inputs-not-completed")
            .classList.add("d-none");

          Swal.fire({
            title: "You need to follow these instructions",
            html: `<p>1- Username must be 3-15 characters long and contain only letters.</p>
            <p>2- Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter.</p>
            <p>3- Email must be 4-20 characters long before '@', contain only letters and numbers, and follow the pattern username@domain.com</p>`,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
      }
    }
  }
  if (button.innerHTML === "Login") {
    if (checkEmailLogin() === "valid" && checkPasswordLogin() === "valid") {
      window.open("welcom.html", "_self");
      localStorage.setItem("currentName", currentName);
    } else {
      if (window.location.href.endsWith("index.html")) {
        if (input[0].value === "" || input[1].value === "") {
          document
            .getElementById("inputs-not-completed")
            .classList.remove("d-none");
          document
            .getElementById("inputs-not-valid")

            .classList.add("d-none");
        } else if (
          checkEmailLogin() === "valid" &&
          checkPasswordLogin() === "not valid"
        ) {
          document
            .getElementById("inputs-not-completed")
            .classList.add("d-none");

          document
            .getElementById("inputs-not-valid")
            .classList.remove("d-none");
        } else if (
          checkEmailLogin() === "not valid" &&
          checkPasswordLogin() === "valid"
        ) {
          document
            .getElementById("inputs-not-completed")
            .classList.add("d-none");

          document
            .getElementById("inputs-not-valid")
            .classList.remove("d-none");
        } else if (
          checkEmailLogin() === "not valid" &&
          checkPasswordLogin() === "not valid"
        ) {
          document
            .getElementById("inputs-not-completed")
            .classList.add("d-none");

          document
            .getElementById("inputs-not-valid")
            .classList.remove("d-none");
        }
      }
    }
  }
});

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   $(#name).text(profile.getName());
//   $(#email).text(profile.getEmail());
//   $(.data).css("display", "block");
//   $(.g - signin2).css("display", "none");
// }

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     alert("hello");
//     $(.g - signin2).css("display", "block");
//     $(.data).css("display", "none");
//   });
// }

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   $("#name").text(profile.getName());
//   $("#email").text(profile.getEmail());
//   $(".data").css("display", "block");
//   $(".g-signin2").css("display", "none");
// }

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     Swal.fire("Signed out.");
//     $(".g-signin2").css("display", "block");
//     $(".data").css("display", "none");
//   });
// }
