import React, { createContext, useContext } from 'react';

export enum Filters {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

/* CONTEXT */

type FilterState = [Filters, React.Dispatch<React.SetStateAction<Filters>>];
export const FilterContext = createContext<FilterState | null>(null);

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === null) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
