let userName = document.getElementById('nameField').value;
let userEmail = document.getElementById('emailField').value;
let passField = document.getElementById('passwordField');
let lengthRules = document.getElementById('lengthRule');
let upperRules = document.getElementById('upperRule');
let lowerRules = document.getElementById('lowerRule');
let numericRules = document.getElementById('numberRule');
let specialRules = document.getElementById('specialRule');
let loginForm =document.getElementById('formInner');
let passSuggestions = document.getElementById('passwordSuggestions');
let passIcons = document.getElementById('passIcon');
let strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
// window.alert(passSuggestion);

passField.addEventListener("click",function(){
    passSuggestions.style.display = "block";
});
passField.addEventListener("keyup",function(){
    
    showSuggestion(passField.value, passSuggestions);
});

function showSuggestion(userPassword)
{   

    if( userPassword.length >= 8 )
    {
        lengthRules.classList.remove("invalid");
        lengthRules.classList.add("valid");

    }
    else
    {
        lengthRules.classList.remove("valid");
        lengthRules.classList.add("invalid");   
    } 
    if(/[A-Z]/.test(userPassword) === true)
    {
       upperRules.classList.remove("invalid");
       upperRules.classList.add("valid");
    }
    else
    {
        upperRules.classList.remove("valid");
        upperRules.classList.add("invalid");   
        
    } 
    if(/[a-z]/.test(userPassword) === true)
    {
       lowerRules.classList.remove("invalid");
       lowerRules.classList.add("valid");
    }
    else
    {
        lowerRules.classList.remove("valid");
        lowerRules.classList.add("invalid");   
        
    } 
    if(/[0-9]/.test(userPassword) === true)
    {
        numericRules.classList.remove("invalid");
        numericRules.classList.add("valid");
    }
    else
    {
        numericRules.classList.remove("valid");
        numericRules.classList.add("invalid");   
        
    } 
    if(/[!@#$%^&*]/.test(userPassword) === true)
    {
        specialRules.classList.remove("invalid");
        specialRules.classList.add("valid");

    }
    else
    {
        specialRules.classList.remove("valid");
        specialRules.classList.add("invalid");   
        
    } 

    if (strong.test(userPassword))
    {
        document.getElementById('strengthDiv').classList.remove("easy");
        document.getElementById('strengthDiv').classList.remove("medium");
        document.getElementById('strengthDiv').classList.add("strong");
        document.getElementById("passwordStrength").textContent = "Strong Password ";

    }
    else
    {
        document.getElementById('strengthDiv').classList.remove("strong");
        document.getElementById('strengthDiv').classList.add("weak");
        document.getElementById("passwordStrength").textContent = "Weak Password";
    }
}

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const isValid = passwordRegex.test("MySecureP@ss1");
// function validatePassword(userPassword) {
//     return {
//         length: userPassword.length >= 8,
//         Upper: /[A-Z]/.test(userPassword),
//         Lower: /[a-z]/.test(userPassword),
//         Number: /[0-9]/.test(userPassword),
//         Special: /[!@#$%^&*]/.test(userPassword)
//     };
// }
