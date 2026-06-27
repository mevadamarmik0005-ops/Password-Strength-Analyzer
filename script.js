const password = document.getElementById("password");
const progressBar = document.getElementById("progressBar");
const strength = document.getElementById("strength");
const scoreText = document.getElementById("score");
const entropyText = document.getElementById("entropy");
const suggestion = document.getElementById("suggestion");

const length = document.getElementById("length");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const special = document.getElementById("special");

const toggle = document.getElementById("togglePassword");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");

password.addEventListener("input", checkPassword);

function checkPassword() {

let pass = password.value;
let score = 0;

const hasLength = pass.length >= 8;
const hasUpper = /[A-Z]/.test(pass);
const hasLower = /[a-z]/.test(pass);
const hasNumber = /[0-9]/.test(pass);
const hasSpecial = /[^A-Za-z0-9]/.test(pass);

update(length, hasLength);
update(upper, hasUpper);
update(lower, hasLower);
update(number, hasNumber);
update(special, hasSpecial);

if(hasLength) score += 20;
if(hasUpper) score += 20;
if(hasLower) score += 20;
if(hasNumber) score += 20;
if(hasSpecial) score += 20;

scoreText.innerHTML = "Score: " + score + "/100";

let entropy = Math.round(pass.length * Math.log2(94));
entropyText.innerHTML = "Entropy: " + entropy + " bits";

progressBar.style.width = score + "%";

if(score <= 20){
progressBar.style.background="red";
strength.innerHTML="Strength: Weak";
suggestion.innerHTML="Use a longer password with uppercase, numbers and symbols.";
}

else if(score <= 40){
progressBar.style.background="orange";
strength.innerHTML="Strength: Medium";
suggestion.innerHTML="Add numbers and special characters.";
}

else if(score <= 80){
progressBar.style.background="#ffd600";
strength.innerHTML="Strength: Strong";
suggestion.innerHTML="Almost perfect!";
}

else{
progressBar.style.background="#00e676";
strength.innerHTML="Strength: Very Strong";
suggestion.innerHTML="Excellent! Your password is strong.";
}

}

function update(item, valid){
item.innerHTML = valid ? "✅ " + item.innerHTML.substring(2) : "❌ " + item.innerHTML.substring(2);
}

toggle.onclick = function(){

if(password.type==="password"){
password.type="text";
toggle.innerHTML="Hide";
}
else{
password.type="password";
toggle.innerHTML="Show";
}

}

generate.onclick = function(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

let pass="";

for(let i=0;i<16;i++){
pass += chars.charAt(Math.floor(Math.random()*chars.length));
}

password.value=pass;

checkPassword();

}

copy.onclick=function(){

navigator.clipboard.writeText(password.value);

copy.innerHTML="Copied!";

setTimeout(()=>{
copy.innerHTML="Copy Password";
},1500);

}

checkPassword();
