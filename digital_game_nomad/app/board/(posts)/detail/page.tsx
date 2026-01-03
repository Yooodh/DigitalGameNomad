// package
import { Suspense } from 'react';

// slice
import { Detail } from '.';

// layer
import Spinner from '@/shared/components/Spinner';

export default function Page() {
  return (
    <Suspense fallback={<Spinner message='게시글 불러오는 중...' />}>
      <Detail />
    </Suspense>
  );
}
