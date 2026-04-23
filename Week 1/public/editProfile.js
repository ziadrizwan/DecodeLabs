let fileLink = document.getElementById('changePicLink');
let fileInput = document.getElementById('profileUpload');
let profileFrame = document.getElementById('profilePic');
let optionsDiv = document.getElementById('profileOptions');
let newPasswordForm = document.getElementById('passwordForm');
let cancelButtonDiv = document.getElementById('cancelButtonDiv');
let cancelButton = document.getElementById('cancelPasswordButton');
let chPassButton = document.getElementById('changePassBtn');
let chButtonDiv = document.getElementById('changeButtonDiv');
let chButton = document.getElementById('changePasswordButton');
let newpassField = document.getElementById('newPassword');
let passField = document.getElementById('passwordField');
let confirmPass = document.getElementById('confirmPasswordField');
let confirmPassDiv = document.getElementById('confirmPasswordDiv');
let lengthRules = document.getElementById('lengthRule');
let upperRules = document.getElementById('upperRule');
let lowerRules = document.getElementById('lowerRule');
let numericRules = document.getElementById('numberRule');
let specialRules = document.getElementById('specialRule');
let passSuggestions = document.getElementById('passwordSuggestions');
let lengthIcons = document.getElementById('lengthIcon');
let upperIcons = document.getElementById('upperIcon');
let lowerIcons = document.getElementById('lowerIcon');
let numericIcons = document.getElementById('numericIcon');
let specialIcons = document.getElementById('specialIcon');
let strengthIcons = document.getElementById('strengthIcon');
let matchIcons = document.getElementById('matchIcon');
let passMatch =  document.getElementById('passwordMatchDiv');
let passMatchStatus = document.getElementById('passwordMatch');
let strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
let deleteButton = document.getElementById('deleteAccBtn');

fileLink.addEventListener('click', function (event) {
    event.preventDefault();
    fileInput.click();
});

fileInput.addEventListener('change', async function () {
    const file = this.files[0]; // 

    if (file) {
        
        const reader = new FileReader();
        reader.onload = (event) => profileFrame.src = event.target.result;
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await fetch('/api/auth/upload-profile-pic', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                profileFrame.src = result.path;
                alert('Profile picture updated successfully!');
            } else {
                alert('Upload failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during upload.');
        }
    }
});

chPassButton.addEventListener("click",function(){
    
    newPasswordForm.classList.remove("hiddenTag");
    cancelButtonDiv.classList.remove("hiddenTag");
    newpassField.classList.remove("hiddenTag");
    chButtonDiv.classList.remove("hiddenTag");
    optionsDiv.classList.remove("options");
    optionsDiv.classList.add("hiddenTag");
});
cancelButton.addEventListener("click", function(){
    newPasswordForm.classList.add("hiddenTag");
    cancelButtonDiv.classList.add("hiddenTag");
    newpassField.classList.add("hiddenTag");
    chButtonDiv.classList.add("hiddenTag");
    optionsDiv.classList.add("options");
    optionsDiv.classList.remove("hiddenTag");
})

passField.addEventListener("click",function(){
    passSuggestions.style.display = "block";
});
passField.addEventListener("",function(){
    passSuggestions.style.display = "block";
});
confirmPass.addEventListener("click",function(){
    passSuggestions.style.display = "none";
    
});
confirmPass.addEventListener("keyup",function(){
    
    confirmPassDiv.style.marginBottom = 'clamp(1rem,1.5vh,4rem)';
    passMatch.classList.remove("hiddenTag");
    matchCheck( passField.value , confirmPass.value);
});
passField.addEventListener("keyup",function(){
    
    showSuggestion(passField.value);
});

function showSuggestion(userPassword)
{   

    if( userPassword.length >= 8 )
    {
        lengthRules.classList.remove("invalid");
        lengthRules.classList.add("valid");
        lengthIcons.setAttribute( "src" , "./Assets/tick-circle.svg");

    }
    else
    {
        lengthIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
        lengthRules.classList.remove("valid");
        lengthRules.classList.add("invalid");   
    } 
    if(/[A-Z]/.test(userPassword) === true)
    {
       upperRules.classList.remove("invalid");
       upperRules.classList.add("valid");
       upperIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        upperRules.classList.remove("valid");
        upperRules.classList.add("invalid");   
        upperIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[a-z]/.test(userPassword) === true)
    {
       lowerRules.classList.remove("invalid");
       lowerRules.classList.add("valid");
       lowerIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        lowerRules.classList.remove("valid");
        lowerRules.classList.add("invalid");   
        lowerIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[0-9]/.test(userPassword) === true)
    {
        numericRules.classList.remove("invalid");
        numericRules.classList.add("valid");
        numericIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        numericRules.classList.remove("valid");
        numericRules.classList.add("invalid");   
        numericIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[!@#$%^&*]/.test(userPassword) === true)
    {
        specialRules.classList.remove("invalid");
        specialRules.classList.add("valid");
        specialIcons.setAttribute( "src" , "./Assets/tick-circle.svg");

    }
    else
    {
        specialRules.classList.remove("valid");
        specialRules.classList.add("invalid");   
        specialIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 

    if (strong.test(userPassword))
    {
        document.getElementById('strengthDiv').classList.remove("easy");
        document.getElementById('strengthDiv').classList.remove("medium");
        document.getElementById('strengthDiv').classList.add("strong");
        strengthIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
        document.getElementById("passwordStrength").textContent = "Strong Password ";
        confirmPassDiv.classList.remove("hiddenTag");

    }
    else
    {
        document.getElementById('strengthDiv').classList.remove("strong");
        document.getElementById('strengthDiv').classList.add("weak");
        strengthIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
        document.getElementById("passwordStrength").textContent = "Weak Password";
        confirmPassDiv.classList.add("hiddenTag");
    }
}

function matchCheck(userPassword, confirmPassword)
{
  if (userPassword === confirmPassword)
  {
    passMatch.classList.remove("invalid");
    passMatch.classList.add("valid");
    matchIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    passMatchStatus.textContent = "Password is matched";
  }
  else
  {
    passMatch.classList.remove("valid");
    passMatch.classList.add("invalid");
    matchIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    passMatchStatus.textContent = "Password is not matched";
  }
}

newPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = passField.value;
    const confirmPassword = confirmPass.value;

    if (!strong.test(newPassword)) {
        alert("Password does not meet strength requirements.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

   
    try {
        const response = await fetch('/change-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword: newPassword })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Password updated successfully!");
            
           
            newPasswordForm.reset();
            newpassField.classList.add("hiddenTag");
            chButtonDiv.classList.add("hiddenTag");
            passSuggestions.style.display = "none";
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("Could not connect to server.");
    }
});
if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
        
        if (confirmed) {
            try {
                const response = await fetch('/delete-account', { method: 'DELETE' });

                if (response.ok) {
                    alert("Account deleted successfully.");
                    window.location.href = '/Signup.html';
                } else {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                }
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Could not connect to server.");
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    let profilePic = document.getElementById('profilePic');
    let nameDisplay = document.getElementById('userNameDisplay');
    let emailDisplay = document.getElementById('userEmailDisplay');

    try {
        const response = await fetch('/api/auth/get-profile');
        const data = await response.json();

        if (response.ok) {
            profilePic.src = data.profilePic;

            nameDisplay.textContent = data.username;
            emailDisplay.textContent = data.email;
        } else {
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
});
