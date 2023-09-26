import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { App } from 'src/app/app.tsx';

describe('App', () => {
    test('Expect the App renders with a Todos widget', async () => {
        render(<App />);

        expect(screen.getByTestId('todos-widget')).toBeInTheDocument();
    });
});
