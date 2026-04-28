export{};
const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
const submitButton = document.querySelector<HTMLButtonElement>("#submitButton");
const errorText = document.querySelector<HTMLParagraphElement>("#errorText");
const resultText = document.querySelector<HTMLParagraphElement>("#resultText"); 

interface FormResult {
    username:string;
    isVaild: boolean;
}

function validateUsername(username:string):FormResult{
    return {
        username: username,
        isVaild: username.length > 0,
    };
}

submitButton?.addEventListener("click", function():void {
    if(nameInput === null || errorText === null || resultText === null){
        return;
    }

    const username: string = nameInput.value.trim();
    const result: FormResult = validateUsername(username);

    if (result.isVaild === false){
        errorText.textContent = "Please enter your username.";
        resultText.textContent="";
        return;
    }

    errorText.textContent = "";
    resultText.textContent = `Hello, ${result.username}!`;
});

const userName: string = "James";
const userAge: number = 20;
const isStudent: boolean = true;

const scores:number[] = [95, 88 , 76];
const skills:string[] = ["HTML", "CSS", "JavaScript"];

interface User{
    name: string;
    age: number;
    isStudent: boolean;
    skills: string[];
}

const user: User = {
    name: userName,
    age: userAge,
    isStudent: isStudent,
    skills: skills,
};

function getUserIntro(user:User): string {
    return '${user.name} is ${user.age} years old and knwos ${user.skills.length} skills.';
}

const intro: string = getUserIntro(user);
console.log(intro);