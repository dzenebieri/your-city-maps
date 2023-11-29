import styles from './PageNotFound.module.css';

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFoundCS}>
      <div>
        <span className='material-symbols-rounded'>error</span>
        <span>Page Not Found</span>
      </div>

      <a href='https://dzenebieri.github.io/your-city-maps'>Back to Home</a>
    </div>
  );
}
