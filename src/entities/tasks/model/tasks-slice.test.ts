import { describe, expect, test } from 'vitest';
import { tasks, tasksReducer } from './tasks-slice.ts';

vitest.mock('uuid', () => ({
    v4: () => 'mocked-id'
}));

const mockTasks = [
    {
        id: '1',
        text: 'Foo bar',
        completed: false
    },
    {
        id: '2',
        text: 'Lorem ipsum',
        completed: true
    }
];

describe('Task reducer unit test', () => {
    test('Existing task toggled', () => {
        expect(tasksReducer(mockTasks, tasks.toggled('1'))).toStrictEqual([
            {
                id: '1',
                text: 'Foo bar',
                completed: true
            },
            {
                id: '2',
                text: 'Lorem ipsum',
                completed: true
            }
        ]);
    });
    test('Non-existent task toggled', () => {
        expect(tasksReducer(mockTasks, tasks.toggled('0'))).toStrictEqual([
            {
                id: '1',
                text: 'Foo bar',
                completed: false
            },
            {
                id: '2',
                text: 'Lorem ipsum',
                completed: true
            }
        ]);
    });
    test('Existing task deleted', () => {
        expect(tasksReducer(mockTasks, tasks.deleted('1'))).toStrictEqual([
            {
                id: '2',
                text: 'Lorem ipsum',
                completed: true
            }
        ]);
    });
    test('Non-existent task deleted', () => {
        expect(tasksReducer(mockTasks, tasks.deleted('-1'))).length(2);
    });
    test('Clear completed', () => {
        expect(tasksReducer(mockTasks, tasks.clearCompleted())).toStrictEqual([
            {
                id: '1',
                text: 'Foo bar',
                completed: false
            }
        ]);
    });
    test('Task added', () => {
        expect(tasksReducer(mockTasks, tasks.added('new task'))).toStrictEqual([
            {
                id: 'mocked-id',
                text: 'new task',
                completed: false
            },
            {
                id: '1',
                text: 'Foo bar',
                completed: false
            },
            {
                id: '2',
                text: 'Lorem ipsum',
                completed: true
            }
        ]);
    });
});
