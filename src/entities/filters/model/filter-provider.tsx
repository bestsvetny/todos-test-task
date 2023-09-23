import React, { useState } from 'react';
import { Filters, FilterContext } from 'src/entities/filters';

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filter, setFilter] = useState<Filters>(Filters.all);
    return <FilterContext.Provider value={[filter, setFilter]}>{children}</FilterContext.Provider>;
};
