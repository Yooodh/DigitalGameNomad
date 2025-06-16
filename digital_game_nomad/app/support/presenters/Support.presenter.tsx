// slice
import Hero from '../components/Hero';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import styles from '../styles/Support.module.scss';
import { SupportPresenterProps } from '../types';

export default function SupportPresenter({
  faqItems,
  openFaq,
  handleInquiryLinkClick,
  toggleFaq,
}: SupportPresenterProps) {
  return (
    <div className={styles.suppertContainer}>
      <Hero />
      <div className={styles.contentContainer}>
        <Faq faqItems={faqItems} openFaq={openFaq} toggleFaq={toggleFaq} />
        <Contact handleInquiryLinkClick={handleInquiryLinkClick} />
      </div>
    </div>
  );
}
