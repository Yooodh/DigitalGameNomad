// slice
import styles from '../styles/Write.module.scss';
import { WritePresenterProps } from '../types';
import InputGroup from '../../components/InputGroup';
import ImageUpload from '../../components/ImageUpload';
import TypeAndGame from '../../components/TypeAndGame';
import SubmitBtn from '../components/SubmitBtn';

export default function WritePresenter({
  titleValue,
  handleTitleChange,
  contentValue,
  handleContentChange,
  currentImageUrl,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  typeAndGameProps,
}: WritePresenterProps) {
  return (
    <div className={styles.writeContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <TypeAndGame {...typeAndGameProps} />

        <InputGroup
          label='제목'
          id='title'
          value={titleValue}
          onChange={handleTitleChange}
          required
          InputComponent='input'
          otherProps={{
            placeholder: '제목을 입력하세요.',
            maxLength: 50,
          }}
        />
        <InputGroup
          label='내용'
          id='content'
          value={contentValue}
          onChange={handleContentChange}
          required
          InputComponent='textarea'
          otherProps={{
            placeholder: '내용을 입력하세요.',
            rows: 10,
          }}
        />

        <ImageUpload
          currentImageUrl={currentImageUrl}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />

        <SubmitBtn isReviewMode={typeAndGameProps.isReviewMode} />
      </form>
    </div>
  );
}
