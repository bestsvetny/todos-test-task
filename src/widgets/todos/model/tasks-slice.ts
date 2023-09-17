import { createContext, Dispatch, Reducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* TYPES */

export type Task = {
    id: string;
    text: string;
    completed: boolean;
};
type TasksState = Array<Task>;
type TasksAction =
    | { type: 'TASK_ADDED'; payload: { text: string; id: string } }
    | { type: 'TASK_TOGGLED'; payload: string }
    | { type: 'TASK_DELETED'; payload: string }
    | { type: 'TASK_CLEAR_COMPLETED' };

/* ACTIONS */
export const taskAdded = (taskText: string): { type: 'TASK_ADDED'; payload: { text: string; id: string } } => {
    return { type: 'TASK_ADDED', payload: { text: taskText, id: uuidv4() } };
};
export const taskToggled = (taskId: string): { type: 'TASK_TOGGLED'; payload: string } => {
    return { type: 'TASK_TOGGLED', payload: taskId };
};
export const taskDeleted = (taskId: string): { type: 'TASK_DELETED'; payload: string } => {
    return { type: 'TASK_DELETED', payload: taskId };
};
export const clearCompleted = (): { type: 'TASK_CLEAR_COMPLETED' } => {
    return { type: 'TASK_CLEAR_COMPLETED' };
};

/* REDUCER */

export const tasksReducer: Reducer<TasksState, TasksAction> = (tasks, action) => {
    switch (action.type) {
        case 'TASK_ADDED':
            return [
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                },
                ...tasks
            ];
        case 'TASK_TOGGLED':
            return tasks.map((task) => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        completed: !task.completed
                    };
                }
                return task;
            });
        case 'TASK_DELETED':
            return tasks.filter((task) => task.id !== action.payload);
        case 'TASK_CLEAR_COMPLETED':
            return tasks.filter((task) => !task.completed);
        default: {
            throw Error('Unknown action');
        }
    }
};

/* CONTEXT */

export const TasksContext = createContext<TasksState | null>(null);
export const TasksDispatchContext = createContext<Dispatch<TasksAction> | null>(null);

export function useTasks() {
    const context = useContext(TasksContext);
    if (context === null) {
        throw new Error('useTasks must be used within a TasksProvider');
    }
    return context;
}

export function useTasksDispatch() {
    const context = useContext(TasksDispatchContext);
    if (context === null) {
        throw new Error('useTasksDispatch must be used within a TasksProvider');
    }
    return context;
}
