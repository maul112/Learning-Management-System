import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShineBorder } from '@/components/ui/shine-border';
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
          <p className="text-base">Semoga aktivitas belajarmu menyenangkan.</p>
          <Card className="relative flex w-full flex-col gap-3 rounded-xl p-6">
            <BorderBeam size={100} duration={10} />
            <p className="font-semibold">Courses</p>
            <div className="flex h-full w-full flex-col justify-between gap-5 rounded-lg border px-3 py-2 md:flex-row md:items-center md:gap-0">
              <p className="text-muted-foreground">
                Kamu belum mempunyai course. Silahkan ambil course sekarang
                untuk belajar. dan mulai lah perjalanan Anda menjadi developer
                profesional.
              </p>
              <Button className="cursor-pointer">
                <Link href="/student/courses">Ambil Course Sekarang</Link>
              </Button>
            </div>
          </Card>
        </section>
        <section className="my-10 grid h-96 grid-cols-1 gap-5 md:grid-cols-2">
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-1 p-5">
                <BookMarked />
                <h3>Aktifitas Belajar</h3>
              </CardTitle>
            </CardHeader>
            <Separator />
            <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
          </Card>
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-1 p-5">
                <BookMarked />
                <h3>Aktifitas Lain</h3>
              </CardTitle>
            </CardHeader>
            <Separator />
            <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
          </Card>
        </section>
      </div>
    </StudentLayout>
  );
}
