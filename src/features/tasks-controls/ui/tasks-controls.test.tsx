import { fireEvent, screen } from '@testing-library/react';
import { renderWithContext } from 'src/shared/tests';
import { beforeEach, expect } from 'vitest';
import { TasksControls } from 'src/features/tasks-controls';

const testToggleInactiveButton = (btn: HTMLElement) => {
    expect(btn).not.toHaveAttribute('data-active');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('data-active');
};

describe('Tasks controls unit test', () => {
    beforeEach(() => {
        renderWithContext(<TasksControls />, []);
    });

    test('Click inactive buttons, expect the clicked button to have an active attribute', () => {
        expect(screen.getByTestId('controls-all-btn')).toHaveAttribute('data-active');
        testToggleInactiveButton(screen.getByTestId('controls-active-btn'));
        testToggleInactiveButton(screen.getByTestId('controls-completed-btn'));
        testToggleInactiveButton(screen.getByTestId('controls-all-btn'));
    });

    test('Click active button, expect the "active" attribute to remain', () => {
        expect(screen.getByTestId('controls-all-btn')).toHaveAttribute('data-active');
        fireEvent.click(screen.getByTestId('controls-all-btn'));
        expect(screen.getByTestId('controls-all-btn')).toHaveAttribute('data-active');
    });
});
