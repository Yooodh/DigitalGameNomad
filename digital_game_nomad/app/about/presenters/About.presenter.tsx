// slice
import ChatItem from '../components/ChatItem';
import PhoneFrame from '../components/PhoneFrame';
import ChatButtonNav from '../components/ChatButtonNav';

import styles from '../styles/About.module.scss';

import { AboutPresenterProps } from '../types';

export default function AboutPresenter({
  about,
  visibleItems,
  setItemRef,
}: AboutPresenterProps) {
  return (
    <div className={styles.aboutContainer}>
      <PhoneFrame title='소개 페이지'>
        <div className={styles.chat__Wrapper}>
          {about.map((item) => (
            <ChatItem
              key={item.id}
              item={item}
              isSender={item.id % 2 === 1}
              isVisible={visibleItems.has(item.id)}
              setItemRef={setItemRef}
            />
          ))}
        </div>
        <ChatButtonNav />
      </PhoneFrame>
    </div>
  );
}
