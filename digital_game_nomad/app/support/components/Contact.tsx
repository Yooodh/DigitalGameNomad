// package
import Link from 'next/link';

// slice
import styles from '../styles/Support.module.scss';
import { ContactProps } from '../types';

export default function Contact({ handleInquiryLinkClick }: ContactProps) {
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactContainer__card}>
        <h3 className={styles.contactContainer__title}>
          도움이 더 필요하신가요?
        </h3>
        <p className={styles.contactContainer__desc}>
          원하는 답변을 찾지 못하셨다면 직접 문의해주세요
        </p>
        <Link href='/support/inquiry' onClick={handleInquiryLinkClick} passHref>
          <button className={styles.contactButton}>문의하기</button>
        </Link>
      </div>
    </section>
  );
}
