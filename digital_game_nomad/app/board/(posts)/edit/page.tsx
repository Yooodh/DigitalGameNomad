// slice
import { Edit } from '.';
import { PageProps } from './types';

export default function page({ params }: PageProps) {
  return <Edit postId={params.id} />;
}
