import UserTable from "./UserTable";

type MainContentProps = {
    activePage: string;
};

function MainContent(props:MainContentProps){
    return (
        <main className="content">
            <h1>{props.activePage}</h1>
            <p>This is the {props.activePage} area.</p>
            {props.activePage === "Dashboard" && (
                <p>This is the dashboard overview.</p>
            )}

            {props.activePage === "Users" &&(
                <UserTable />
            )}

            {props.activePage === "Settings" && (
                <p>This is the settings page.</p>
            )}

            {props.activePage === "Reports" && (
                <p>This is the reports page.</p>
            )}

            {props.activePage === "Analytics" && (
                <p>This is the analytics page.</p>
            )}
        </main>
    );
}

export default MainContent;