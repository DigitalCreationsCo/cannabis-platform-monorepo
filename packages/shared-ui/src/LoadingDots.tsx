import styles from './styles/loading-dots.module.css';
import cx from 'clsx';

const LoadingDots = () => {
    return (
        <span className={cx(styles.loading, 'text-primary bg-primary')}>
            <span className="text-primary bg-primary" />
            <span className="text-primary bg-primary" />
            <span className="text-primary bg-primary" />
        </span>
    );
};

export default LoadingDots;
