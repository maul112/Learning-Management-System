import { RootContent } from '@/components/root-content';
import { useAppearance } from '@/hooks/use-appearance';
import { Certificate as CertificateType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { addYears, format } from 'date-fns';
import { useEffect, useMemo } from 'react';

export default function Certificate() {
  const { certificate } = usePage<
    SharedData & { certificate: { data: CertificateType } }
  >().props;
  const { updateAppearance } = useAppearance();

  useEffect(() => {
    updateAppearance('light');
    window.print();

    return () => {
      updateAppearance('system');
    };
  }, [updateAppearance]);

  console.log(certificate);

  const completedAt = useMemo(() => {
    const progress = certificate.data.student.course_progresses.find(
      (p) => p.course.id === certificate.data.course.id,
    );
    return progress?.completed_at ?? null;
  }, [certificate.data]);

  const formattedCompletedDate = completedAt
    ? format(new Date(completedAt), 'dd MMMM yyyy')
    : '-';

  const formattedValidUntil = completedAt
    ? format(addYears(new Date(completedAt), 3), 'dd MMMM yyyy')
    : '-';

  return (
    <div className="bg-neutral-800 pb-32 pt-10 print:flex print:h-[100vh] print:items-center print:justify-center print:py-0">
      <RootContent>
        <div className="border-4 bg-white p-10 print:h-auto print:w-full print:break-inside-avoid print:overflow-hidden print:p-6">
          <h1 className="mb-10 text-4xl font-bold">NEXTLMS</h1>
          <div className="mb-5 w-52 rounded font-semibold text-white">
            {certificate.data.course.academic.title}
          </div>
          <p className="text-muted-foreground mb-5">Diberikan kepada</p>
          <h2 className="mb-5 text-3xl font-bold text-cyan-300">
            {certificate.data.student.user.name}
          </h2>
          <p className="text-muted-foreground mb-3">
            Atas kelulusannya pada kelas
          </p>
          <h2 className="mb-20 text-2xl font-bold text-cyan-300">
            {certificate.data.course.title}
          </h2>

          <p className="text-muted-foreground mb-5">{formattedCompletedDate}</p>
          <div className="flex items-center justify-between print:items-start print:gap-8">
            <div>
              <h4 className="font-semibold">Ahmad Mufid Risqi</h4>
              <p className="text-muted-foreground text-sm">
                Full Stack Developer
              </p>
              <p className="text-muted-foreground text-sm">NextLMS Indonesia</p>
            </div>
            <div>
              <h4 className="font-semibold">Verifikasi Sertifikat</h4>
              <p className="text-muted-foreground text-sm">
                Berlaku hingga {formattedValidUntil}
              </p>
            </div>
          </div>
        </div>
      </RootContent>
    </div>
  );
}
