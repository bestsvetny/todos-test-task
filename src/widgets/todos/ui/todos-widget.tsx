import { Flex, Text } from '@chakra-ui/react';
import { TasksList } from 'src/features/tasks-list';
import { NewTaskField } from 'src/features/new-task-field';
import { TasksControls } from 'src/features/tasks-controls';
export const TodosWidget = () => {
    return (
        <Flex flexDirection='column' alignItems='center'>
            <Text fontSize='6xl' fontWeight='300' color='pink.200' textShadow='2px 2px 2px #bbb'>
                TODOS
            </Text>
            <Flex
                minHeight='19rem'
                maxHeight='75vh'
                flexDirection='column'
                justifyContent='space-between'
                padding='20px'
                bg='white'
                width='600px'
                boxShadow='2px 2px 7px #bbb'
                gap='10px'
            >
                <NewTaskField />
                <TasksList />
                <TasksControls />
            </Flex>
        </Flex>
    );
};
