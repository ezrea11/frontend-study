type User = {
    id: number;
    name: string;
    role: string;
    status: string;
    createdAt: string;
};

const mockUsers: User[] = [
    {
        id: 1,
        name: "Alice Chen",
        role: "Admin",
        status: "Active",
        createdAt: "2026-05-01",
    },
    {
        id: 2,
        name: "Brian Lee",
        role: "Editor",
        status: "Active",
        createdAt: "2026-05-03",
    },
    {
        id: 3,
        name: "Cindy Wang",
        role: "Viewer",
        status: "Inactive",
        createdAt: "2026-05-05",
    },
];

function UserTable(){
    return (
        <div>
            <h2>User List</h2>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>

                <tbody>
                    {mockUsers.map((user) =>(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>{user.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;