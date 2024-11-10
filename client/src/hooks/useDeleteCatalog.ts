import { useState } from "react";
import axios from "axios";

const useDeleteCatalog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const deleteCatalog = async (catalogId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.delete(`http://localhost:8080/catalogs/${catalogId}`);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError("An error occurred while deleting the catalog");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteCatalog, loading, error, success };
};

export default useDeleteCatalog;
