import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from "./delete-multi-catalog.module.css";
import useDeleteBulkCatalogs from "../../hooks/useDeleteBulkCatalogs"; 
import { useCatalogContext } from '../../context/CatalogContext';

const DeleteMultiCatalogs: React.FC = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [catalogIds, setCatalogIds] = useState<string>(""); 
    const { deleteCatalogs, loading, error, success } = useDeleteBulkCatalogs();
    const { triggerRefresh } = useCatalogContext();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const idsArray = catalogIds.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));

        if (idsArray.length === 0) {
            alert("Please enter valid catalog IDs separated by commas.");
            return;
        }

        await deleteCatalogs(idsArray);
        if (success) {
            setCatalogIds("");
        }
        triggerRefresh();
    };

    return (
        <div>
            <div className={styles.service_top_cont} onClick={() => setOpenForm(!openForm)}>
                <p>Delete multiple catalogs</p>
                {openForm ? <FaChevronUp /> : <FaChevronDown />}     
            </div>

            <form className={`${styles.catalog_form} ${openForm ? styles.show : ''}`} onSubmit={handleDelete}>
                <div className={styles.input_cont}>
                    <p>ID's</p>
                    <input type="text" value={catalogIds} onChange={(e) => setCatalogIds(e.target.value)} required placeholder="Catalog IDs separated by commas"/>
                </div>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">Catalogs deleted successfully!</p>}

                <div className={styles.btn_cont}>
                    <button type="submit" disabled={loading}>
                        {loading ? "Deleting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteMultiCatalogs;
