// JavaScript code for form validation

// get the form element by its ID
let myForm = document.getElementById("myForm");

// Retrieve the input field element by its ID
let inputField = document.getElementById("inputField");

// Create the error message element
let errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.textAlign = "center";
errorMessage.style.marginTop = "8px";
// insert the error message element after the input field
inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);


// Add an event listener to the form for the submit event
myForm.addEventListener("submit", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Regular expression for alphanumeric input
  let isValid = /^[a-zA-Z0-9]+$/.test(inputField.value);
   
  // Invalid input: display error message
  if (!isValid) {
    errorMessage.textContent = "Invalid input. Please enter an alphanumeric value";
  
  //Display a confirmation if the input is valid and 'submits' the form*
  } else {
    // Clear any previous error message
    errorMessage.textContent = ""; 
    alert("Successfully submitted form with valid input");
    myForm.submit(); 
  }
})

/*Add an event listener to the input field for the input event
This will clear the error message when the user starts typing*/
inputField.addEventListener("input", function() {
  // Clear the error message when the user starts typing
let isValid = /^[a-zA-Z0-9]+$/.test(inputField.value)
  if(isValid){
    errorMessage.textContent = "";
  }
})




     
        