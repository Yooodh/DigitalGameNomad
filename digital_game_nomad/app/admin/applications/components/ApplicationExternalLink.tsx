// package
import Link from 'next/link';

// slice
import styles from '../styles/AdminApplications.module.scss';
import { ApplicationExternalLinkProps } from '../types';

// layer
import { ExternalLink, Youtube } from '@/shared/icons';

export default function ApplicationExternalLink({
  href,
  type,
}: ApplicationExternalLinkProps) {
  if (!href) {
    return null;
  }

  const icon = type === 'game' ? <ExternalLink /> : <Youtube />;
  const label = type === 'game' ? '게임 링크' : '유튜브';

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.gridlinkContainer__link}
    >
      {icon} {label}
    </Link>
  );
}
