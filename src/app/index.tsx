import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from 'src/app/styles/theme.ts';
import { TasksProvider, TodosWidget } from 'src/widgets/todos';
import { FilterProvider } from 'src/features/tasks-controls';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <TasksProvider>
                <FilterProvider>
                    <Flex flexDirection='column'>
                        <TodosWidget />
                    </Flex>
                </FilterProvider>
            </TasksProvider>
        </ChakraProvider>
    );
};
