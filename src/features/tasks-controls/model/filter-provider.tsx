import React, { useState } from 'react';
import { FilterContext } from 'src/features/tasks-controls/model/filter-slice.ts';
import { Filters } from 'src/features/tasks-controls/model/filter-slice.ts';

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filter, setFilter] = useState<Filters>(Filters.all);
    return <FilterContext.Provider value={[filter, setFilter]}>{children}</FilterContext.Provider>;
};
