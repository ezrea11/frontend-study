const users = [
  { name: "Alex", role: "Admin", active: true },
  { name: "Mia", role: "Editor", active: false },
  { name: "Leo", role: "Viewer", active: true },
  { name: "Nina", role: "Editor", active: false }
];

const userList = document.querySelector("#userList");
const showAllButton = document.querySelector("#showAllButton");
const showActiveButton = document.querySelector("#showActiveButton");   

function renderUsers(list){
    //userList.innerHTML = "";

    list.forEach(function(user){
        const li = document.createElement("li");
        li.textContent = user.name + " - " + user.role;
        userList.appendChild(li);
    });
}
showActiveButton.addEventListener("click",function(){
    const activeUsers = users.filter(function(user){
     return user.active === true;
    });

    renderUsers(activeUsers);
});


showAllButton.addEventListener("click",function(){
    renderUsers(users);
});

console.log(activeUsers);

renderUsers(activeUsers);