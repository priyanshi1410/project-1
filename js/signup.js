const userdata =(e) => {
    e.preventDefault();
}

let user = {
    name:document.getElementById('name'),value,
    email:document.getElementById('email'),value,
    password:document.getElementById('password'),value
}

console.log(user);
var nameregex = /^[a-zA-Z\-]+$/;
    var Password = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/;
    var email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

// name
if(!(regexname .test(user.name))){
    document.getElementById("username").innerHTML="not valid name";
    document.getElementById("username").style.color="red";
}
else {
    document.getElementById("username").innerHTML="valid name";
}

// email

if(!(regexemail .test(user.email))){
    document.getElementById("useremail").innerHTML="not valid email";
    document.getElementById("useremail").style.color="red";
}
else {
    document.getElementById("useremail").innerHTML="valid email";
}
//  password

if(!(regexpassword .test(user.password))){
    document.getElementById("userpassword").innerHTML="not valid password";
    document.getElementById("userpassword").style.color="red";
}
else {
    document.getElementById("userpassword").innerHTML="valid password";
}

if((regexname.test(user.name) && (regexemail.test(user.email)) && (regexpassword.test(user.password)))){

    fetch()
    .then((res) => res.json())
    .then((data) =>{
       if (data.length > 0){

       }
    });
}

document .getElementById('userdata').addEventListener('submit',userdata);