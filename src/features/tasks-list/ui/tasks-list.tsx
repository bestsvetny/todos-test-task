import React from 'react';
import { Checkbox, Flex, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Task, taskDeleted, taskToggled, useTasks, useTasksDispatch } from 'src/widgets/todos';
import { Filters, useFilter } from 'src/features/tasks-controls';

const filterTasks = (tasks: Array<Task>, filter: Filters) => {
    switch (filter) {
        case Filters.completed:
            return tasks.filter((task) => task.completed);
        case Filters.active:
            return tasks.filter((task) => !task.completed);
        default:
            return tasks;
    }
};

interface TasksItemProps {
    task: Task;
}

const TasksItem = React.memo(({ task }: TasksItemProps) => {
    const dispatch = useTasksDispatch();
    const handleToggleTask = () => {
        dispatch(taskToggled(task.id));
    };
    const handleCLose = () => {
        dispatch(taskDeleted(task.id));
    };
    return (
        <ListItem data-testid='task-item'>
            <Flex alignItems='center' justifyContent='space-between' minHeight='2.8rem' borderBottom='1px solid #eee'>
                <Flex gap='10px'>
                    <Checkbox
                        data-testid='task-checkbox'
                        isChecked={task.completed}
                        onChange={handleToggleTask}
                    ></Checkbox>
                    <Text overflowWrap='break-word' maxWidth='470px'>
                        {task.text}
                    </Text>
                </Flex>
                <IconButton
                    data-testid='task-close'
                    aria-label='Close task'
                    icon={<CloseIcon />}
                    variant='ghost'
                    onClick={handleCLose}
                />
            </Flex>
        </ListItem>
    );
});

export const TasksList = () => {
    const tasks = useTasks();
    const [activeFilter] = useFilter();
    const filteredTasks = filterTasks(tasks, activeFilter);
    return (
        <List
            display='flex'
            flexDirection='column'
            minHeight='10rem'
            maxHeight='65vh'
            overflow='scroll'
            paddingX='10px'
            css={{
                '&::-webkit-scrollbar': {
                    width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#cdcdcd',
                    borderRadius: '24px'
                }
            }}
        >
            {!tasks.length && (
                <Flex justifyContent='center' alignItems='center' height='100%'>
                    <Text fontSize='2xl' color='blackAlpha.500'>
                        Add todos
                    </Text>
                </Flex>
            )}
            {filteredTasks.map((task) => (
                <TasksItem key={task.id} task={task} />
            ))}
        </List>
    );
};
