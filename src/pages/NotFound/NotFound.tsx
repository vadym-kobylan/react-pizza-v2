import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1>
        <span>😕</span>
        <br />
        Page not Found
      </h1>
      <p className={styles.description}>Unfortunately, this page is not available</p>
    </div>
  );
};

export default NotFound;
