import React from "react";
import { GrCatalog } from "react-icons/gr";
import styles from "./logo.module.css";

const Logo:React.FC = () => {
    return (
        <div className={styles.logo_cont}>
            <GrCatalog className={styles.icon}/>
            <p>CatalogWise</p>
        </div>
    );
}

export default Logo;