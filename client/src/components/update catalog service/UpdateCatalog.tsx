import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./update-catalog.module.css";
import useUpdateCatalog from "../../hooks/useUpdateCatalog";
import { useCatalogContext } from '../../context/CatalogContext';

const UpdateCatalog: React.FC<{ userId: number }> = ({ userId }) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [catalogId, setCatalogId] = useState<string>("");
  const [isPrimary, setIsPrimary] = useState<boolean | null>(null);
  const [locales, setLocales] = useState<string>("");
  const { triggerRefresh } = useCatalogContext();

  const { updateCatalog, loading, error, success } = useUpdateCatalog();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        is_primary: isPrimary === null ? undefined : isPrimary,
        locales: locales.split(",").map((locale) => locale.trim()),
      };

      // Update catalog by catalog ID
      updateCatalog(parseInt(catalogId), updateData);
      

      // Reset form fields after successful update
      if (success) {
        setCatalogId("");
        setIsPrimary(null);
        setLocales("");
        triggerRefresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={styles.service_top_cont} onClick={() => setOpenForm(!openForm)}>
        <p>Update a catalog</p>
        {openForm ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <form onSubmit={handleSubmit} className={`${styles.catalog_form} ${openForm ? `${styles.show}` : ""}`}>
        <div className={styles.input_cont}>
          <p>Catalog ID</p>
          <input type="text" value={catalogId} onChange={(e) => setCatalogId(e.target.value)} required/>
        </div>

        <div className={styles.input_cont}>
          <p>Primary?</p>
          <label className={styles.checkbox_style}>
            <input type="radio" name="myOption" value="true" checked={isPrimary === true} onChange={() => setIsPrimary(true)}/>
            <p>True</p>
          </label>

          <label className={styles.checkbox_style}>
            <input type="radio" name="myOption" value="false" checked={isPrimary === false} onChange={() => setIsPrimary(false)}/>
            <p>False</p>
          </label>
        </div>

        <div className={styles.input_cont}>
          <p>Locales</p>
          <input type="text"value={locales}onChange={(e) => setLocales(e.target.value)} placeholder="Separate with commas"/>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">Catalog updated successfully!</p>}

        <div className={styles.btn_cont}>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCatalog;
