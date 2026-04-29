import Sidebar from "./Sidebar";
import Content from "./Content";
import { useState } from "react";

function Layout(){
    const [activePage, setActivePage] = useState("Users");

    return(
        <div className="layout">
            <Sidebar activePage={activePage} onChangePage={setActivePage}/>
            <Content title={activePage}/>
        </div>
    );
}

export default Layout;