import { Button } from '@presentation/components/atoms/button';
import { Typography } from '@presentation/components/atoms/typography';
import Image from 'next/image';
import { useCallback } from 'react';

import styles from './styles.module.scss';
import type { CardProps } from './types';

export function Card({
  category,
  thumbUrl,
  alt,
  title,
  subTitle,
  description,
  caption,
  buttons,
}: CardProps): JSX.Element {
  const renderChildren = useCallback((): JSX.Element => {
    switch (category) {
      case 'large':
        return (
          <>
            <Image src={thumbUrl!} alt={alt!} width={320} height={240} />
            <div className={styles['card-wrapper']}>
              <div>
                <Typography as="h6">{title}</Typography>
                <Typography category="s2">{subTitle}</Typography>
              </div>
              <Typography category="p1">{description}</Typography>
              <Typography category="c1">{caption}</Typography>
              <div className={styles['button-container']}>
                <Button
                  appearances="ghost"
                  sizes="small"
                  onClick={buttons?.ghostButtonOnClick}
                >
                  <p>{buttons?.ghostButtonTitle}</p>
                </Button>
                <Button sizes="small" onClick={buttons?.filledButtonOnClick}>
                  <p>{buttons?.filledButtonTitle}</p>
                </Button>
              </div>
            </div>
          </>
        );
      case 'small':
        return (
          <div className={styles['card-wrapper']}>
            <Typography category="p1">{description}</Typography>
          </div>
        );
      default:
        return (
          <div className={styles['card-wrapper']}>
            <div>
              <Typography as="h6">{title}</Typography>
              <Typography category="s2">{subTitle}</Typography>
            </div>
            <Typography category="p1">{description}</Typography>
          </div>
        );
    }
  }, [category]);

  return <div className={styles['card-container']}>{renderChildren()}</div>;
}
