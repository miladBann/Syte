import axios from 'axios';
import { useState } from 'react';

interface CreateCatalogData {
  user_id: number;
  name: string;
  vertical: 'fashion' | 'home' | 'general';
  is_primary: boolean;
  locales: string[];
}

export const useCreateCatalog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCatalog = async (catalogData: CreateCatalogData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:8080/catalogs`, {
        ...catalogData,
        indexed_at: new Date().toISOString(),
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError('Error creating catalog');
      setLoading(false);
      throw err;
    }
  };

  return { createCatalog, loading, error };
};
