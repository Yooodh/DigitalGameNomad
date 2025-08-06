// slice
import EditContainer from './containers/Edit.container';
import { PageProps } from './types';

export default function page({ params }: PageProps) {
  return (
    <>
      <EditContainer postId={params.id} />
    </>
  );
}
