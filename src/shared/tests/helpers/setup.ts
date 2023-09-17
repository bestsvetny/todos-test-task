import { renderWithContext } from 'src/shared/tests';
import { Task } from 'src/widgets/todos';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

export const setup = (component: React.ReactNode, initialTasks?: Array<Task>) => {
    const user = userEvent.setup();
    return {
        ...renderWithContext(component, initialTasks),
        user
    };
};
