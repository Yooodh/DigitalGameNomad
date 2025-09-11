// slice
import Badge from '../components/Badge';
import styles from '../styles/Edit.module.scss';
import { EditPresenterProps } from '../types';
import InputGroup from '../../components/InputGroup';
import ImageUpload from '../../components/ImageUpload';
import TypeAndGame from '../../components/TypeAndGame';
import ActionBtns from '../components/ActionBtns';

export default function EditPresenter({
  title,
  setTitle,
  content,
  setContent,
  topic,
  currentImageUrl,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  handleCancel,
  saving,
  isReviewMode,
  typeAndGameProps,
}: EditPresenterProps) {
  return (
    <div className={styles.editContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Badge topic={topic} />

        {isReviewMode && <TypeAndGame {...typeAndGameProps} />}

        <InputGroup
          label='제목'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          InputComponent='input'
          otherProps={{
            placeholder: '제목을 입력하세요',
            maxLength: 50,
          }}
        />
        <InputGroup
          label='내용'
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          InputComponent='textarea'
          otherProps={{
            placeholder: '내용을 입력하세요',
            rows: 15,
          }}
        />

        <ImageUpload
          currentImageUrl={currentImageUrl}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />

        <ActionBtns saving={saving} handleCancel={handleCancel} />
      </form>
    </div>
  );
}
