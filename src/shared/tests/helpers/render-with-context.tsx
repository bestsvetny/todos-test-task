import { render } from '@testing-library/react';
import { FilterProvider } from 'src/entities/filters';
import { Task, TasksProvider } from 'src/entities/tasks';
import React from 'react';

export const renderWithContext = (component: React.ReactNode, initialTasks?: Array<Task>) => {
    return {
        ...render(
            <TasksProvider initialTasks={initialTasks}>
                <FilterProvider>{component}</FilterProvider>
            </TasksProvider>
        )
    };
};
