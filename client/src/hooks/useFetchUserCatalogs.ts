import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCatalogContext } from '../context/CatalogContext';

interface Catalog {
  catalog_id: number;
  user: { user_id: number };
  name: string;
  vertical: string;
  is_primary: boolean;
  indexed_at: string | null;
  multiLocale: boolean; 
}

const useFetchUserCatalogs = (userId: number) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshTrigger } = useCatalogContext(); 

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Catalog[]>(`http://localhost:8080/catalogs/user/${userId}`);
        setCatalogs(response.data);
      } catch (err) {
        setError('Failed to fetch catalogs');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [userId, refreshTrigger]);

  return { catalogs, loading, error };
};

export default useFetchUserCatalogs;
