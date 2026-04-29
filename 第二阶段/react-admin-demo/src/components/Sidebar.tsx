type SidebarProps = {
    activePage: string;
    onChangePage: (page: string) => void;
};

const menuItems = ["Dashboard", "Users", "Settings", "Reports", "Analytics"];

function Sidebar(props: SidebarProps){
    return(
        <aside className="sidebar">
            <h2>Admin Demo</h2>

            {menuItems.map((item) => (
                <button
                key = {item}
                className={props.activePage === item ? "menu-item active" : "menu-item"}
                onClick={() => props.onChangePage(item)}
                >
                    {item}
                </button>
            ))}

            {/*<button 
                className={props.activePage === "Dashboard" ? "menu-item active" : "menu-item"}
                onClick={() => props.onChangePage("Dashboard")}
            >
                Dashboard
            </button>

            <button 
                className={props.activePage === "Users" ? "menu-item active" : "menu-item"}
                onClick={() => props.onChangePage("Users")}
            >
                Users
            </button>

            <button 
                className={props.activePage === "Settings" ? "menu-item active" : "menu-item"}
                onClick={() => props.onChangePage("Settings")}
            >
                Settings
            </button>

            <button
                className={props.activePage === "Reports" ? "menu-item active" : "menu-item"}
                onClick={() => props.onChangePage("Reports")}
            >
                Reports
            </button> */}
        </aside>
    );
}

export default Sidebar;