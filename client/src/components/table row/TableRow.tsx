import React, {useState} from "react";
import styles from "./table-row.module.css";
import { IoCloseSharp } from "react-icons/io5";
import useDeleteCatalog from "../../hooks/useDeleteCatalog";


interface Catalog {
    catalog_id: number;
    user?: { user_id: number };
    name: string;
    vertical: string;
    is_primary: boolean;
    indexed_at: string | null;
    multiLocale: boolean; 
}

interface tableRowProps {
    catalog: Catalog;
}

const TableRow:React.FC<tableRowProps> = ({catalog}) => {
    const [hovering, setHovering] = useState<boolean>(false);
    const { deleteCatalog, loading, error, success } = useDeleteCatalog();
    
    const isPrimary = () => {
        if (catalog.is_primary === true) {
            return <p className={styles.primary}>Primary</p>
        }else {
            return <p className={styles.not_primary}>Not Primary</p>
        }
    }

    const handleDelete = () => {
        deleteCatalog(catalog.catalog_id);
        window.location.reload();
    };
    {console.log(catalog.multiLocale)}

    return (
        <>
            <div className={styles.row_cont} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                {hovering ? <IoCloseSharp className={styles.close_icon} onClick={handleDelete}/> : null}
                
                <p className={styles.p1}>{catalog.catalog_id}</p>
                <p className={styles.p2}>{catalog.user ? catalog.user.user_id : "N/A"}</p>
                <p className={styles.p3}>{catalog.name}</p>
                <p className={styles.p7}>{catalog.multiLocale ? "Yes" : "No"}</p>
                <p className={styles.p4}>{catalog.vertical}</p>
                <p className={styles.p5}>{isPrimary()}</p>
                <p className={styles.p6}>{catalog.indexed_at}</p>
            </div>

            {loading && <p>Deleting catalog...</p>}
            {error && <p className="error">{error}</p>}
        </>
        
    );
}

export default TableRow;