import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from 'src/app/styles/theme.ts';
import { TodosWidget } from 'src/widgets/todos';
import { TasksProvider } from 'src/entities/tasks';
import { FilterProvider } from 'src/entities/filters';
import { ErrorFallback, ErrorBoundary } from 'src/shared/utils';

export const App = () => {
    return (
        <ErrorBoundary fallback={<ErrorFallback errorMessage='Something went wrong' />}>
            <ChakraProvider theme={theme}>
                <ErrorBoundary fallback={<ErrorFallback errorMessage='Something went wrong' />}>
                    <TasksProvider>
                        <FilterProvider>
                            <Flex flexDirection='column' paddingBottom='20px'>
                                <TodosWidget />
                            </Flex>
                        </FilterProvider>
                    </TasksProvider>
                </ErrorBoundary>
            </ChakraProvider>
        </ErrorBoundary>
    );
};
