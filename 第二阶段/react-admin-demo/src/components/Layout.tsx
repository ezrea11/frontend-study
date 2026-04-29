import Sidebar from "./Sidebar";
import Content from "./Content";

function Layout(){
    return(
        <div className="layout">
            <Sidebar/>
            <Content title="Dashboard"/>
        </div>
    );
}

export default Layout;