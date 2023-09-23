import React, { useReducer } from 'react';
import { Task, tasksReducer, TasksContext, TasksDispatchContext } from './tasks-slice.ts';

const defaultTasks = [
    {
        id: '1',
        text: 'Implement a Todo app',
        completed: true
    },
    {
        id: '2',
        text: 'Test coverage',
        completed: true
    },
    {
        id: '3',
        text: 'Receive an invitation to an interview',
        completed: false
    }
];
export const TasksProvider = ({
    children,
    initialTasks = defaultTasks
}: {
    children: React.ReactNode;
    initialTasks?: Array<Task>;
}) => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
};
