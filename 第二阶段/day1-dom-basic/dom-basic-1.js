const nameInput = document.querySelector("#nameInput");
const showButton = document.querySelector("#showButton");
const resultText = document.querySelector("#resultText");
const clearButton = document.querySelector("#clearButton"); 

console.log("JS file loaded")

showButton.addEventListener("click",function(){
    console.log("button clicked");

    const name = nameInput.value.trim();

    if(name ===""){
        resultText.textContent = "Please enter your name first.";
    }else{
        resultText.textContent = "Hello, " + name + "!";
    }
}); 

clearButton.addEventListener("click",function(){
    nameInput.value="";
    resultText.textContent = "Your name will appear here.";
});