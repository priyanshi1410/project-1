const login = (e) => {
  e.preventDefault();

  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  fetch()
    .then((res) => res.json())
    .then((data) => console.log(data));
  if (data.length > 0) {
    if (data[0].password === password) {
      alert("login successful");
    } 
    else 
    {
      alert("login failed");
    }
  } 
  else
   {
    alert("user not found");
  }
};
