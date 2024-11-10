import React from "react";
import styles from "./user-view.module.css";
import Table from "../table/Table";


const UserView: React.FC = () => {
    return (
        <>
            <div className={styles.users_cont}>
                <p className={styles.title}>Your Catalogs</p>
            </div>

            <div className={styles.catalogs_cont}>
                <Table />
            </div>
        </>
        
    );
}

export default UserView;