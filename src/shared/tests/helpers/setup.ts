import { renderWithContext } from './render-with-context.tsx';
import { Task } from 'src/entities/tasks';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

export const setup = (component: React.ReactNode, initialTasks?: Array<Task>) => {
    const user = userEvent.setup();
    return {
        ...renderWithContext(component, initialTasks),
        user
    };
};
