const nameInput = document.querySelector("#nameInput");
const submitButton = document.querySelector("#submitButton");
const errorText = document.querySelector("#errorText");
const resultText = document.querySelector("#resultText");   

submitButton.addEventListener("click",function(){
    const name = nameInput.value.trim();

    if (name ===""){
        errorText.textContent = "Please enter your name.";
        resultText.textContent = "";
        return;
    }
    errorText.textContent = "";
    resultText.textContent = "Submitted user:" + name;

});