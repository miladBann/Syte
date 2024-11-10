import React from "react";
import styles from "./side-nav.module.css";
import Logo from "../logo/Logo";
import CreateCatalog from "../create catalog service/CreateCatalog";
import UpdateCatalog from "../update catalog service/UpdateCatalog";
import DeleteMultiCatalogs from "../delete multiple catalogs/DeleteMultiCatalogs";
import Profile from "../profile/Profile";
import useUser from "../../hooks/useUser";


const SideNav: React.FC = () => {
    const { user, error, loading } = useUser(1);

    return (
        <div className={styles.side_nav_cont}>
            <Logo />
            
            {
                user && <Profile user={user}/>
            }

            <div className={styles.services_cont}>
                {user && <CreateCatalog userId={user?.user_id}/>}
                {user && <UpdateCatalog userId={user?.user_id}/>}
                {user && <DeleteMultiCatalogs />}
            </div>
            
        </div>
    );
}

export default SideNav;
