export{};

interface User{
    id: number;
    name: string;
    email: string;
    role?: string;
    avatarUrl?: string;
}

const userA: User = {
    id: 1,
    name: "James",
    email: "james@example.com",
    role: "admin",
};

const userB: User = {
    id: 2,
    name: "Alex",
    email: "alex@example.com",
};

const userC: User = {
    id: 3,
    name: "Tom",
    email: "tom@example.com",
    role:"",
};

function getUserRole(user: User): string {
    if (user.role){
        return user.role;
    }

    return "normal user";
}

console.log(getUserRole(userA));
console.log(getUserRole(userB));
console.log(getUserRole(userC));