// layer
import View from '@/shared/ui/forbidden/View';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const params = await searchParams;
  return <View reason={params.reason ?? 'default'} />;
}
