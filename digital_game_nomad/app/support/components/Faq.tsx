// slice
import styles from '../styles/Support.module.scss';
import { FaqProps } from '../types';

export default function Faq({ faqItems, openFaq, toggleFaq }: FaqProps) {
  return (
    <section className={styles.contentContainer__faqWrap}>
      <div className={styles.contentContainer__header}>
        <h2 className={styles.contentContainer__title}>자주 묻는 질문</h2>
        <p className={styles.contentContainer__subTitle}>
          가장 많이 묻는 질문들을 모아봤습니다
        </p>
      </div>

      <div className={styles.contentContainer__faqList}>
        {faqItems.map((item) => (
          <div key={item.id} className={styles.contentContainer__faqItem}>
            <button
              className={`${styles.contentContainer__faqQuestion} ${
                openFaq === item.id ? styles.active : ''
              }`}
              onClick={() => toggleFaq(item.id)}
            >
              <span className={styles.contentContainer__questionText}>
                {item.question}
              </span>
              <span
                className={`${styles.contentContainer__chevron} ${
                  openFaq === item.id ? styles.rotated : ''
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`${styles.contentContainer__faqAnswer} ${
                openFaq === item.id ? styles.open : ''
              }`}
            >
              <div className={styles.contentContainer__answerContent}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
