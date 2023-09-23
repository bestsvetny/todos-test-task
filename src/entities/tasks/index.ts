export type { Task } from './model/tasks-slice.ts';
export {
    useTasks,
    useTasksDispatch,
    taskAdded,
    taskToggled,
    taskDeleted,
    clearCompleted
} from './model/tasks-slice.ts';
export { TasksProvider } from './model/tasks-provider.tsx';
