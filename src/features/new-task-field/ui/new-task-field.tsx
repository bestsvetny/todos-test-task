import { Box, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { tasks, useTasksDispatch } from 'src/entities/tasks';

export const NewTaskField = () => {
    const [taskText, setTaskText] = useState<string>('');
    const dispatch = useTasksDispatch();
    const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTaskText(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskText) {
            dispatch(tasks.added(taskText));
        }
        setTaskText('');
    };

    return (
        <Box as='form' data-testid='task-form' padding='0 10px 0px 10px' onSubmit={handleSubmit}>
            <Input
                data-testid='task-input'
                variant='flushed'
                autoFocus
                placeholder='What needs to be done?'
                size='lg'
                value={taskText}
                onChange={handleTextChange}
            />
        </Box>
    );
};
