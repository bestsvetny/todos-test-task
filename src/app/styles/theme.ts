import { extendTheme } from '@chakra-ui/react';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false
};

export const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                bg: 'blackAlpha.100',
                color: 'gray.600'
            }
        }
    }
});
