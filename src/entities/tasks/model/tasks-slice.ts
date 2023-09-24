import { createContext, Dispatch, Reducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Task = {
    id: string;
    text: string;
    completed: boolean;
};
type TasksState = Array<Task>;

export const tasks = {
    added: (taskText: string): { type: 'TASKS_ADDED'; payload: { text: string; id: string } } => {
        return { type: 'TASKS_ADDED', payload: { text: taskText, id: uuidv4() } };
    },
    toggled: (taskId: string): { type: 'TASKS_TOGGLED'; payload: string } => {
        return { type: 'TASKS_TOGGLED', payload: taskId };
    },
    deleted: (taskId: string): { type: 'TASKS_DELETED'; payload: string } => {
        return { type: 'TASKS_DELETED', payload: taskId };
    },
    clearCompleted: (): { type: 'TASKS_CLEAR_COMPLETED' } => {
        return { type: 'TASKS_CLEAR_COMPLETED' };
    }
};

type TasksAction =
    | ReturnType<typeof tasks.added>
    | ReturnType<typeof tasks.toggled>
    | ReturnType<typeof tasks.deleted>
    | ReturnType<typeof tasks.clearCompleted>;

export const tasksReducer: Reducer<TasksState, TasksAction> = (tasks, action) => {
    switch (action.type) {
        case 'TASKS_ADDED':
            return [
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                },
                ...tasks
            ];
        case 'TASKS_TOGGLED':
            return tasks.map((task) => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        completed: !task.completed
                    };
                }
                return task;
            });
        case 'TASKS_DELETED':
            return tasks.filter((task) => task.id !== action.payload);
        case 'TASKS_CLEAR_COMPLETED':
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
