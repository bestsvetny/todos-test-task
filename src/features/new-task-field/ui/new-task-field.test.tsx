import { fireEvent, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { NewTaskField } from 'src/features/new-task-field';
import { renderWithContext } from 'src/shared/tests';

describe('Task input field', () => {
    test('Input and submit text, expect the input to have the text value', () => {
        renderWithContext(<NewTaskField />, []);
        const text = 'My task';
        expect(screen.getByTestId('task-input')).toHaveValue('');
        fireEvent.change(screen.getByTestId('task-input'), { target: { value: text } });
        expect(screen.getByTestId('task-input')).toHaveValue(text);
        fireEvent.submit(screen.getByTestId('task-input'));
        expect(screen.getByTestId('task-input')).toHaveValue('');
    });
});
