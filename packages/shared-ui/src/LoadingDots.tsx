import styles from './styles/loading-dots.module.css';
import cx from 'clsx';

const LoadingDots = () => {
    return (
        <span className={cx(styles.loading, 'bg-primary')}>
            <span className="bg-primary" />
            <span className="bg-primary" />
            <span className="bg-primary" />
        </span>
    );
};

export default LoadingDots;
