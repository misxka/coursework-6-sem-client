import { errors } from '../../utils/errors';

import styles from './Error.module.scss';

interface Props {
  code: string;
}

export default function ErrorDisplayer({ code }: Props) {
  const error = errors.find(elem => elem.errorCode === code);

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.errorCode}>{error?.errorCode}</h1>
        <div className={styles.border}>
          <h2 className={styles.errorMessage}>{error?.errorMessage}</h2>
        </div>
      </div>
    </div>
  );
}
