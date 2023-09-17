import { screen, within } from '@testing-library/react';
import { TodosWidget } from 'src/widgets/todos';
import { renderWithContext } from 'src/shared/tests';
import { beforeEach, expect } from 'vitest';
import { userEvent, UserEvent } from '@testing-library/user-event';

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

const userToggleInactiveButton = async (user: UserEvent, btn: HTMLElement) => {
    expect(btn).not.toHaveAttribute('data-active');
    await user.click(btn);
    expect(btn).toHaveAttribute('data-active');
};

const user = userEvent.setup();

describe('Todos widget', () => {
    test('Expect the Todos widget render with context values', async () => {
        renderWithContext(<TodosWidget />, mockTasks);

        const todosElement = screen.getByText(/first task/i);
        expect(todosElement).toBeInTheDocument();
    });
});

describe('User creates new task via input field', () => {
    beforeEach(() => {
        renderWithContext(<TodosWidget />, mockTasks);
    });

    test('User adds new task, expect the new task to be on a screen', async () => {
        const text = 'My task';

        expect(screen.getByTestId('controls-counter')).toContainHTML('1 items left');

        await user.type(screen.getByTestId('task-input'), `${text}{enter}`);
        expect(screen.getByTestId('task-input')).toHaveValue('');
        expect(screen.getByText(text)).toBeInTheDocument();

        expect(screen.getByTestId('controls-counter')).toContainHTML('2 items left');
    });

    test('User submit with blank input, expect the tasks list to be same length', async () => {
        expect(screen.getAllByTestId('task-item')).length(3);

        await user.type(screen.getByTestId('task-input'), `{enter}`);
        expect(screen.getByTestId('task-input')).toHaveValue('');

        expect(screen.getAllByTestId('task-item')).length(3);
    });
});

describe('User interacts with tasks list', () => {
    beforeEach(() => {
        renderWithContext(<TodosWidget />, mockTasks);
    });

    test('User toggles checkbox, expect the "items left" counter to increase', async () => {
        const tasks = screen.getAllByTestId('task-item');
        const checkbox = within(tasks[0]).getByTestId('task-checkbox');
        expect(checkbox).toHaveAttribute('data-checked');

        expect(screen.getByTestId('controls-counter')).toContainHTML('1 items left');

        await user.click(checkbox);
        expect(checkbox.dataset.checked).toBeFalsy();

        expect(screen.getByTestId('controls-counter')).toContainHTML('2 items left');
    });

    test('User clicks close task, expect the tasks count to decrease', async () => {
        const tasks = screen.getAllByTestId('task-item');
        expect(tasks).length(3);

        const closeBtn = within(tasks[0]).getByTestId('task-close');
        await user.click(closeBtn);
        expect(screen.getAllByTestId('task-item')).length(2);
    });
});

describe('User clicks buttons in controls group', () => {
    beforeEach(() => {
        renderWithContext(<TodosWidget />, mockTasks);
    });

    test('User clicks filter buttons, expect the tasks list to be filtered', async () => {
        expect(screen.getByTestId('controls-all-btn')).toHaveAttribute('data-active');
        expect(screen.getAllByTestId('task-item')).length(3);

        await userToggleInactiveButton(user, screen.getByTestId('controls-active-btn'));
        screen.getAllByTestId('task-item').forEach((task) => {
            const checkbox = within(task).getByTestId('task-checkbox');
            expect(checkbox).not.toHaveAttribute('data-checked');
        });

        await userToggleInactiveButton(user, screen.getByTestId('controls-completed-btn'));
        screen.getAllByTestId('task-item').forEach((task) => {
            const checkbox = within(task).getByTestId('task-checkbox');
            expect(checkbox).toHaveAttribute('data-checked');
        });

        await userToggleInactiveButton(user, screen.getByTestId('controls-all-btn'));
        expect(screen.getAllByTestId('task-item')).length(3);
    });

    test('User clicks "clear completed" button, expect the completed tasks to be cleared', async () => {
        expect(screen.getByTestId('controls-all-btn')).toHaveAttribute('data-active');
        expect(screen.getAllByTestId('task-item')).length(3);

        await user.click(screen.getByTestId('controls-clear-btn'));
        screen.getAllByTestId('task-item').forEach((task) => {
            const checkbox = within(task).getByTestId('task-checkbox');
            expect(checkbox).not.toHaveAttribute('data-checked');
        });
    });
});
