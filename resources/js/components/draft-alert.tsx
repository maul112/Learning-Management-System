import { TriangleAlert } from 'lucide-react';
import { Alert, AlertTitle } from './ui/alert';

export function DraftAlert({
  status,
  title,
}: {
  status: string;
  title: string;
}) {
  if (status == 'published') return null;

  return (
    <Alert className="border-amber-400">
      <AlertTitle className="flex items-center gap-2 text-sm text-amber-300">
        <TriangleAlert className="h-5 w-5 text-amber-400" />
        {title} is in draft mode. It will not be visible to students.
      </AlertTitle>
    </Alert>
  );
}
