import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import StudentLayout from '@/layouts/student-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookMarked } from 'lucide-react';

export default function StudentDashboard() {
  const { auth } = usePage<SharedData>().props;

  return (
    <StudentLayout>
      <Head title="Dashboard" />
      <div className="px-10 py-14 xl:px-0">
        <section className="flex h-fit flex-col gap-3">
          <h2 className="text-2xl font-semibold">
            Selemat datang {auth.user.name}!
          </h2>
          <p className="text-muted-foreground text-base">
            Semoga aktivitas belajarmu menyenangkan.
          </p>
          <div className="bg-accent flex w-full flex-col gap-3 rounded-xl p-6">
            <p className="font-semibold">Courses</p>
            <div className="border-muted-foreground flex h-full w-full flex-col justify-between gap-5 rounded-lg border px-3 py-2 md:flex-row md:items-center md:gap-0">
              <p className="text-muted-foreground">
                Kamu belum mempunyai course. Silahkan ambil course sekarang
                untuk belajar. dan mulai lah perjalanan Anda menjadi developer profesional.
              </p>
              <Button className="cursor-pointer">
                <Link href="/student/courses">Ambil Course Sekarang</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="mt-10 grid h-96 grid-cols-1 gap-5 md:mt-10 md:grid-cols-2">
          <div className="bg-accent rounded-xl">
            <span className="flex gap-1 p-5">
              <BookMarked />
              <h3>Aktifitas Belajar</h3>
            </span>
            <Separator className="bg-muted-foreground" />
            <div className="flex flex-col gap-4 p-5">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="bg-muted-foreground h-28 w-full rounded-xl"
                ></div>
              ))}
            </div>
          </div>
          <div className="bg-accent rounded-xl">
            <span className="flex gap-1 p-5">
              <BookMarked />
              <h3>Aktifitas Lain</h3>
            </span>
            <Separator className="bg-muted-foreground" />
            <div className="grid grid-cols-2 gap-4 p-5">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="bg-muted-foreground h-28 w-full rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
}
