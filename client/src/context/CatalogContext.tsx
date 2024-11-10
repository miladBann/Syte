import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CatalogContextProps {
    refreshTrigger: boolean;
    triggerRefresh: () => void;
}

const CatalogContext = createContext<CatalogContextProps | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const triggerRefresh = () => setRefreshTrigger(prev => !prev);

    return (
        <CatalogContext.Provider value={{ refreshTrigger, triggerRefresh }}>
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalogContext = () => {
    const context = useContext(CatalogContext);
    if (!context) {
        throw new Error('useCatalogContext must be used within a CatalogProvider');
    }
    return context;
};
