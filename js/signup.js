
import Navbar from '../components/nav.js';

document.getElementById('navbar').innerHTML = Navbar()



const signupdata = (e) => {
  e.preventDefault();

  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(user);
  var nameregex = /^[a-zA-Z\-]+$/;
  var Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
  var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  // name
  if (!(nameregex.test(user.name))) {
    document.getElementById("n_err").innerHTML = "not valid name";
  }
  // email
  if (!(email.test(user.email))) {
    document.getElementById("e_err").innerHTML = "not valid email";
  }
  //  password
  if (!(Password.test(user.password))) {
    document.getElementById("p_err").innerHTML = "not valid password";
  }
  if (
    email.test(user.email) &&
    Password.test(user.password) &&
    nameregex.test(user.name)
  ) {
    fetch(`http://localhost:3000/user?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          localStorage.setItem("loggedIn",true);
          alert("user already exists");
          setTimeout(() => {
            window.location.href = "/pages/login.html";
          }, 2000);
        } else {
          fetch("http://localhost:3000/user", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
          });
        }
      });
  }
};

document.getElementById("signupdata").addEventListener("submit",signupdata);

// password

// document.getElementById("Password").addEventListener("keypress", () => {
//   let Pass = document.getElementById("Password").value;
//   var Password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//   if (!Password.test(Pass)) {
//       document.getElementById("p_err").innerHTML = "Password is not a valid password"
//   }
//   else {
//       document.getElementById("p_err").innerHTML = "valid passwod";
//       document.getElementById("p_err").style.color = "green";
//   }
// });
 
// // name
// document.getElementById("name").addEventListener("keypress", () => {
//   let nam = document.getElementById("name").value;
//   var nameregex = /^[a-zA-Z\-]+$/;
 
//   if (!nameregex.test(nam)) {
//       document.getElementById("n_err").innerHTML = "Password is not a valid password"
//   }
//   else {
//       document.getElementById("n_err").innerHTML = "valid passwod";
//       document.getElementById("n_err").style.color = "green";
//   }
// });
// // email
// document.getElementById("email").addEventListener("keypress", () => {
//   let emails = document.getElementById("email").value;
//   var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
 
//   if (!email.test(emails)) {
//       document.getElementById("e_err").innerHTML = "Password is not a valid password"
//   }
//   else {
//       document.getElementById("e_err").innerHTML = "valid passwod";
//       document.getElementById("e_err").style.color = "green";
//   }
// });