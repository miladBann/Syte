import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './create-catalog.module.css';
import { useCreateCatalog } from '../../hooks/useCreateCatalog';
import { useCatalogContext } from '../../context/CatalogContext';

type VerticalType = "fashion" | "home" | "general";

const CreateCatalog: React.FC<{ userId: number }> = ({ userId }) => {
  const { createCatalog, loading, error } = useCreateCatalog();
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    vertical: 'fashion' as VerticalType,
    is_primary: false,
    locales: '',
  });
  const { triggerRefresh } = useCatalogContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const locales = formData.locales.split(',').map(locale => locale.trim());
      
      // Ensure is_primary is a boolean
      const catalogData = {
        ...formData,
        locales,
        user_id: userId,
        is_primary: formData.is_primary === true,
      };

      await createCatalog(catalogData);
      triggerRefresh();

      // Reset form fields
      setFormData({
        name: '',
        vertical: 'fashion',
        is_primary: false,
        locales: '',
      });
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>   
      <div className={styles.service_top_cont} onClick={() => setOpenForm(!openForm)}>
        <p>Create catalog</p>
        {openForm ? <FaChevronUp /> : <FaChevronDown />}     
      </div>

      <form onSubmit={handleSubmit} className={`${styles.catalog_form} ${openForm ? styles.show : ''}`}>
        <div className={styles.input_cont}>
          <p>Name</p>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter catalog name"/>
        </div>

        <div className={styles.input_cont}>
          <p>Vertical</p>
          <select name="vertical" value={formData.vertical} onChange={handleInputChange} required>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className={styles.input_cont}>
          <p>Primary?</p>
          <label className={styles.checkbox_style}>
            <input type="radio" name="is_primary" value="true" onChange={() => setFormData((prev) => ({ ...prev, is_primary: true }))} checked={formData.is_primary === true}/>
            <p>True</p>
          </label>

          <label className={styles.checkbox_style}>
            <input type="radio" name="is_primary" value="false" onChange={() => setFormData((prev) => ({ ...prev, is_primary: false }))} checked={formData.is_primary === false}/>
            <p>False</p>
          </label>
        </div>

        <div className={styles.input_cont}>
          <p>Locales</p>
          <input type="text" name="locales" value={formData.locales} onChange={handleInputChange} required placeholder="Separate with commas"/>
        </div>
        
        <div className={styles.btn_cont}>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Submit'}</button>
        </div>
        
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default CreateCatalog;
