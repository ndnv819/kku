import styles from './styles.module.scss';
import { DefaultLoaderProps } from './types';

export function DefaultLoader({ key, style }: DefaultLoaderProps): JSX.Element {
  return (
    <div
      key={key}
      style={{
        ...style,
      }}
    >
      <span className={styles.loader} />
    </div>
  );
}
