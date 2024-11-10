import { useState } from "react";
import axios from "axios";

interface UpdateCatalogData {
  is_primary?: boolean;
  locales?: string[];
  indexed_at?: string;
}

interface UpdateCatalogResponse {
  catalog_id: number;
  name: string;
  vertical: string;
  is_primary: boolean;
  indexed_at: string;
}

const useUpdateCatalog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const updateCatalog = async (catalogId: number, updateData: UpdateCatalogData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Filter out empty locales
    const validLocales = updateData.locales?.filter(locale => locale !== '');

    // Prepare final data, omit 'locales' if it's empty or undefined
    const finalUpdateData: UpdateCatalogData = {
      ...updateData,
      ...(validLocales?.length ? { locales: validLocales } : {}),
      indexed_at: new Date().toISOString(),  // Set current time
    };

    try {
      const response = await axios.put<UpdateCatalogResponse>(
        `http://localhost:8080/catalogs/${catalogId}`,
        finalUpdateData
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError("An error occurred while updating the catalog");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateCatalog, loading, error, success };
};

export default useUpdateCatalog;
