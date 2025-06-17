// package
import Link from 'next/link';
import Image from 'next/image';

// slice
import styles from '../styles/About.module.scss';

import { ChatItemProps } from '../types';

// layer
import kakaoProfile from '@/public/images/kakao.png';

export default function ChatItem({
  item,
  isSender,
  isVisible,
  setItemRef,
}: ChatItemProps) {
  const isLinkText = item.linkTo !== undefined;

  const messageContent = (
    <span className={styles.chat__messageBubble}>
      {item.text.replace('<Click>', '')}
    </span>
  );

  return (
    <div
      key={item.id}
      ref={(el) => setItemRef(el, item.id)}
      data-id={item.id}
      className={`${styles.chat__conversationItem} ${
        isSender ? styles.chat__sender : styles.chat__receiver
      } ${isVisible ? styles.isVisible : ''}`}
    >
      {isSender && (
        <Image
          src={kakaoProfile}
          alt='프로필 이미지'
          className={styles.chat__profile}
          width={40}
          height={40}
        />
      )}
      {isLinkText ? (
        <Link href={item.linkTo!}>
          <span
            className={`${styles.chat__messageBubble} ${styles.chat__linkText}`}
          >
            {item.text.replace('<Click>', '')}
            <span className={styles.chat__clickIndicator}>(Click!)</span>
          </span>
        </Link>
      ) : (
        messageContent
      )}
    </div>
  );
}
