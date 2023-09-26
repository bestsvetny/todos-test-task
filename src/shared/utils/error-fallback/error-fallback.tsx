import styles from './error-fallback.module.css';
export const ErrorFallback = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>{errorMessage}</h1>
        </div>
    );
};
