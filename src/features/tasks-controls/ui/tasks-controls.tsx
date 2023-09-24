import { Button, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { tasks, useTasks, useTasksDispatch } from 'src/entities/tasks';
import { Filters, useFilter } from 'src/entities/filters';

export const TasksControls = () => {
    const [activeFilter, setActiveFilter] = useFilter();
    const dispatchTask = useTasksDispatch();

    const handleClear = () => {
        dispatchTask(tasks.clearCompleted());
    };
    const handleFilterChange = (filter: Filters) => {
        if (activeFilter === filter) {
            return;
        }
        setActiveFilter(filter);
    };
    return (
        <Grid templateColumns='repeat(3, 1fr)' alignItems='center'>
            <TaskCounter />
            <Stack direction='row'>
                <Button
                    data-testid='controls-all-btn'
                    variant='outline'
                    isActive={activeFilter === Filters.all}
                    size='sm'
                    onClick={() => handleFilterChange(Filters.all)}
                >
                    All
                </Button>
                <Button
                    data-testid='controls-active-btn'
                    variant='outline'
                    isActive={activeFilter === Filters.active}
                    size='sm'
                    onClick={() => handleFilterChange(Filters.active)}
                >
                    Active
                </Button>
                <Button
                    data-testid='controls-completed-btn'
                    variant='outline'
                    isActive={activeFilter === Filters.completed}
                    size='sm'
                    onClick={() => handleFilterChange(Filters.completed)}
                >
                    Completed
                </Button>
            </Stack>
            <GridItem display='flex' justifyContent='end'>
                <Button data-testid='controls-clear-btn' variant='ghost' size='sm' onClick={handleClear}>
                    Clear Completed
                </Button>
            </GridItem>
        </Grid>
    );
};

const TaskCounter = () => {
    const tasks = useTasks();
    const countRemain = tasks ? tasks.filter((task) => !task.completed).length : 0;

    return (
        <GridItem display='flex'>
            <Text data-testid='controls-counter'>{countRemain} items left</Text>
        </GridItem>
    );
};
