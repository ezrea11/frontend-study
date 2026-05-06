import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Topbar from "../components/Topbar";
import { useState } from "react";

function AdminLayout(){
    const [activePage, setActivePage] = useState("Dashboard");

    return(
        <div className="admin-layout">
            <Topbar/>
            
            <div className="admin-body">
                <Sidebar activePage={activePage} onChangePage={setActivePage}/>
                <MainContent activePage={activePage}/>
            </div>
        </div>
    );
}

export default AdminLayout;