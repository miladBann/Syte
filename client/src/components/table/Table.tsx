import React, { useState } from "react";
import styles from "./table.module.css";
import TableRow from "../table row/TableRow";
import useFetchUserCatalogs from "../../hooks/useFetchUserCatalogs";

const Table: React.FC = () => {
    const userId = 1;
    const { catalogs, loading, error } = useFetchUserCatalogs(userId);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterMultiLocale, setFilterMultiLocale] = useState<boolean>(false);

    // Filter catalogs based on the search query (case-insensitive search)
    let filteredCatalogs = catalogs.filter(catalog =>
        catalog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Further filter by multi-locale if the filterMultiLocale state is true
    if (filterMultiLocale) {
        filteredCatalogs = filteredCatalogs.filter(catalog => catalog.multiLocale);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>No catalogs to show for this user</p>;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const toggleMultiLocaleFilter = () => {
        setFilterMultiLocale(!filterMultiLocale);
    };

    return (
        <>
            <div className={styles.filters_cont}>
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search catalogs"/>

                <button onClick={toggleMultiLocaleFilter}
                    style={{
                        backgroundColor: filterMultiLocale ? 'green' : 'gray',
                        
                    }}>
                    {filterMultiLocale ? "Show All" : "Show Multi-locale"}
                </button>
            </div>

            <div className={styles.table_cont}>
                <div className={styles.main_row}>
                    <p className={styles.p1}>Catalog ID</p>
                    <p className={styles.p2}>User ID</p>
                    <p className={styles.p3}>Name</p>
                    <p className={styles.p7}>Multi-locale</p>
                    <p className={styles.p4}>Vertical</p>
                    <p className={styles.p5}>Is Primary</p>
                    <p className={styles.p6}>Indexed at</p>
                </div>

                {filteredCatalogs.length > 0 ? (
                    filteredCatalogs.map((catalog) => (
                        <TableRow key={catalog.catalog_id} catalog={catalog} />
                    ))
                ) : (
                    <p>No catalogs match your search criteria.</p>
                )}
            </div>
        </>
    );
};

export default Table;
