import { useState } from "react";
import axios from "axios";

const useDeleteBulkCatalogs = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteCatalogs = async (ids: number[]) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.delete("http://localhost:8080/catalogs", {
                data: { ids }
            });
            setSuccess(true);
        } catch (err) {
            setError("An error occurred while deleting catalogs.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteCatalogs, loading, error, success };
};

export default useDeleteBulkCatalogs;
