import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithContext } from 'src/shared/tests';
import { beforeEach, expect } from 'vitest';
import { TasksList } from 'src/features/tasks-list';

const mockTasks = [
    {
        id: '1',
        text: 'First task',
        completed: true
    },
    {
        id: '2',
        text: 'Second Task',
        completed: true
    },
    {
        id: '3',
        text: 'Third task',
        completed: false
    }
];

describe('Tasks list unit test', () => {
    beforeEach(() => {
        renderWithContext(<TasksList />, mockTasks);
    });

    test('Click checkbox, expect checkbox to be toggle', () => {
        const tasks = screen.getAllByTestId('task-item');
        const checkbox = within(tasks[0]).getByTestId('task-checkbox');
        expect(checkbox).toHaveAttribute('data-checked');
        fireEvent.click(checkbox);
        expect(checkbox).not.toHaveAttribute('data-checked');
    });

    test('Close task, expect the list to be shortened by one element', () => {
        const tasks = screen.getAllByTestId('task-item');
        expect(tasks).length(3);
        const closeBtn = within(tasks[0]).getByTestId('task-close');
        fireEvent.click(closeBtn);
        expect(screen.getAllByTestId('task-item')).length(2);
    });
});
