import { render } from '@testing-library/react';
import { FilterProvider } from 'src/features/tasks-controls';
import { Task, TasksProvider } from 'src/widgets/todos';
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
