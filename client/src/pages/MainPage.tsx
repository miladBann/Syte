import React from "react";
import SideNav from '../components/side-nav/SideNav';
import UserView from "../components/user view/UserView";
import { CatalogProvider } from "../context/CatalogContext";


const MainPage: React.FC = () => {
    return (
        <CatalogProvider>
            <div className="wrapper">
                <SideNav />

                <div className="container">
                    <UserView />
                </div>
            </div>
        </CatalogProvider>
    );
}

export default MainPage;