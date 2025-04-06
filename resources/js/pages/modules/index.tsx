import { DataTable } from '@/components/data-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Module } from '@/types';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Modules',
    href: '/modules',
  },
];

export default function Modules({
  modules,
  success,
}: {
  modules: { data: Module[] };
  success?: string;
}) {
  const [alertTimeout, setAlertTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (success) {
      setAlertTimeout(
        setTimeout(() => {
          setAlertTimeout(null);
        }, 5000),
      );
    }
  }, [success]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {alertTimeout && success && (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <Alert className="text-green-400">
              <CircleCheck className="h-4 w-4 text-green-400" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        </AnimatePresence>
      )}
      <Head title="Modules" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable<Module, string>
            columns={columns}
            searchKey="title"
            data={modules.data}
            create="module"
          />
        </div>
      </div>
    </AppLayout>
  );
}
