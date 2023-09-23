import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from 'src/app/styles/theme.ts';
import { TodosWidget } from 'src/widgets/todos';
import { TasksProvider } from 'src/entities/tasks';
import { FilterProvider } from 'src/entities/filters';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <TasksProvider>
                <FilterProvider>
                    <Flex flexDirection='column' paddingBottom='20px'>
                        <TodosWidget />
                    </Flex>
                </FilterProvider>
            </TasksProvider>
        </ChakraProvider>
    );
};
