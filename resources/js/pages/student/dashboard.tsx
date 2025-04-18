import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function StudentDashboard() {
  const { auth } = usePage<SharedData>().props;

  return (
    <StudentLayout>
      <Head title="Dashboard" />
      <div className="py-14">
        <section className="flex h-80 flex-col gap-3">
          <h2 className="text-2xl font-semibold">
            Selemat datang {auth.user.name}
          </h2>
          <p className="text-muted-foreground text-base">
            Semoga aktivitas belajarmu menyenangkan.
          </p>
          <div className="bg-accent flex h-40 w-full flex-col gap-3 rounded-xl p-6">
            <p className="font-semibold">Status Langganan</p>
            <div className="border-muted-foreground flex h-full w-full items-center justify-between rounded-lg border px-3 py-2">
              <p className="text-muted-foreground">
                Anda belum berlangganan. Pilih paket langganan dan mulai lah
                perjalanan Anda menjadi developer profesional.
              </p>
              <Button className="cursor-pointer">Langganan Sekarang</Button>
            </div>
          </div>
        </section>
        <section className="grid h-96 grid-cols-2 gap-5">
          <div className="rounded-xl bg-accent"></div>
          <div className="rounded-xl bg-accent"></div>
        </section>
      </div>
    </StudentLayout>
  );
}
