import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedData, Student } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios'; // Pastikan axios diimport
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  BookMarked,
  CheckCircle,
  GraduationCap,
  LoaderCircle,
} from 'lucide-react'; // Tambah LoaderCircle
import { useEffect, useState } from 'react'; // Tambah useEffect
import { toast } from 'sonner';
import { Button } from './ui/button';

// Perbarui interface CertificateData sesuai dengan data yang dikirim backend
interface CertificateData {
  certificateId: number; // Dari backend `certificate->id`
  studentName: string;
  courseTitle: string;
  completionDate: string;
  issueDate?: string; // Dari backend `certificate->created_at`
  courseInstructor: string;
  courseDuration: string;
}

export function StudentAcademyTabs() {
  const { student } = usePage<SharedData & { student: { data: Student } }>()
    .props;

  // State untuk mengelola data sertifikat yang akan dicetak
  const [currentPrintData, setCurrentPrintData] =
    useState<CertificateData | null>(null);
  // State untuk mengelola status loading saat mengambil data sertifikat
  const [loadingCertificate, setLoadingCertificate] = useState(false);

  // Periksa kembali filter ini, pastikan progress.is_completed memang 0 atau 1
  // Jika di database boolean, PHP biasanya mengembalikannya sebagai true/false
  const courseProgressesOngoing = student.data.course_progresses.filter(
    (progress) => progress.is_completed === false, // Gunakan boolean
  );

  const courseProgressesCompleted = student.data.course_progresses.filter(
    (progress) => progress.is_completed === true, // Gunakan boolean
  );

  console.log('courseProgressesOngoing', courseProgressesOngoing);
  console.log('courseProgressesCompleted', courseProgressesCompleted);
  console.log('student', student);

  // Fungsi untuk memuat data sertifikat dan memicu pencetakan
  const handlePrintCertificate = async (courseId: number) => {
    setLoadingCertificate(true); // Mulai loading
    try {
      // Panggil endpoint backend yang baru untuk mendapatkan data JSON sertifikat
      const response = await axios.get<CertificateData>(
        route('courses.certificate.data', courseId),
      );

      // Asumsi backend mengembalikan status HTTP 200 untuk sukses
      if (response.status === 200) {
        setCurrentPrintData(response.data); // Simpan data ke state
        toast.success(
          'Data sertifikat berhasil dimuat, sedang mempersiapkan cetak.',
        );
      } else {
        // Tangani kasus non-200 OK, seperti 403 atau 404 dari backend
        const errorData = response.data as { message?: string }; // Casting untuk mengakses message
        toast.error(errorData.message || 'Gagal memuat data sertifikat.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error fetching certificate data:', error);
      if (error.response) {
        // Error dari server (misal: 403 Course not completed)
        toast.error(
          error.response.data.message ||
            'Terjadi kesalahan saat memuat data sertifikat dari server.',
        );
      } else if (error.request) {
        // Permintaan dikirim tapi tidak ada respons (misal: network error)
        toast.error(
          'Tidak ada respons dari server. Periksa koneksi internet Anda.',
        );
      } else {
        // Kesalahan lain
        toast.error(
          'Terjadi kesalahan yang tidak terduga saat memuat data sertifikat.',
        );
      }
      setCurrentPrintData(null); // Bersihkan data pada error
    } finally {
      setLoadingCertificate(false); // Selesai loading
    }
  };

  // Gunakan useEffect untuk memicu window.print() setelah data siap
  useEffect(() => {
    if (currentPrintData) {
      // Beri sedikit jeda agar React memiliki waktu untuk merender komponen tersembunyi
      const printDelay = setTimeout(() => {
        window.print(); // Pemicu dialog cetak browser
        setCurrentPrintData(null); // Bersihkan data setelah cetak untuk menyembunyikan komponen
      }, 500); // Jeda 500ms

      return () => clearTimeout(printDelay); // Bersihkan timer jika komponen di-unmount
    }
  }, [currentPrintData]); // Effect ini berjalan setiap kali currentPrintData berubah

  return (
    <Tabs defaultValue="learning" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-4 bg-transparent">
        <TabsTrigger
          value="learning"
          className={`data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-muted/80 relative flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all`}
        >
          Kelas yang Sedang di Belajar
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className={`data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=inactive]:bg-muted data-[state=inactive]:hover:bg-muted/80 relative flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all`}
        >
          Kelas yang Sudah Selesai
        </TabsTrigger>
      </TabsList>

      <TabsContent value="learning" className="mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <GraduationCap className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">
              Kelas yang Sedang Dipelajari
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {courseProgressesOngoing.length > 0 ? (
              courseProgressesOngoing.map((courseProgress) => (
                <div
                  key={courseProgress.id}
                  className="bg-background rounded-lg border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="bg-muted mb-3 h-48 w-full rounded-md">
                    <img
                      src={`/storage/${courseProgress.course.image}`}
                      alt={courseProgress.course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      {courseProgress.course?.title || 'Unknown Course'}
                    </h4>
                    <div className="text-muted-foreground flex justify-between text-sm">
                      <span>
                        {Math.round(Number(courseProgress.progress_percentage))}
                        %
                      </span>
                      <span>
                        {courseProgress.lessons_completed}/
                        {courseProgress.total_lessons} Lesson
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${courseProgress.progress_percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center">
                Tidak ada kelas yang sedang dipelajari.
              </p>
            )}
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="completed" className="mt-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <BookMarked className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Kelas yang Sudah Selesai</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {courseProgressesCompleted.length > 0 ? (
              courseProgressesCompleted.map((courseProgress) => (
                <div
                  key={courseProgress.id}
                  className="bg-background rounded-lg border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="bg-muted mb-3 h-48 w-full rounded-md">
                    <img
                      className="h-full w-full object-cover"
                      src={`/storage/${courseProgress.course.image}`}
                      alt={courseProgress.course.title}
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      {courseProgress.course?.title || 'Unknown Course'}
                    </h4>
                    <div className="text-muted-foreground flex justify-between text-sm">
                      <span>
                        {courseProgress.completed_at
                          ? format(
                              new Date(courseProgress.completed_at),
                              'yyyy-MM-dd',
                            )
                          : 'N/A'}
                      </span>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    </div>
                    <div className="bg-muted h-2 w-full rounded-full">
                      <div className="h-2 w-full rounded-full bg-green-500"></div>
                    </div>
                    <Button
                      className="mt-4"
                      onClick={() =>
                        handlePrintCertificate(courseProgress.course.id)
                      }
                      disabled={loadingCertificate} // Nonaktifkan tombol saat loading
                    >
                      {loadingCertificate ? (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Cetak Sertifikat
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center">
                Belum ada kelas yang diselesaikan.
              </p>
            )}
          </div>
        </motion.div>
      </TabsContent>

      {/* Bagian Sertifikat Tersembunyi untuk Pencetakan */}
      {currentPrintData && (
        <div className="certificate-print-area">
          <div className="certificate-container mx-auto max-w-4xl rounded-lg border border-gray-300 bg-white p-10">
            <h1 className="mb-6 text-4xl font-bold text-blue-600">
              Certificate of Completion
            </h1>
            <p className="mb-4 text-lg">This certifies that</p>
            <h2 className="mb-6 text-3xl font-semibold">
              {currentPrintData.studentName}
            </h2>
            <p className="mb-4 text-lg">
              has successfully completed the course
            </p>
            <h3 className="mb-8 text-2xl font-bold">
              "{currentPrintData.courseTitle}"
            </h3>
            <p className="text-lg">
              Completed on: {currentPrintData.completionDate}
            </p>
            <p className="text-lg">
              Issued on:{' '}
              {currentPrintData.issueDate || currentPrintData.completionDate}
            </p>{' '}
            {/* Gunakan issueDate */}
            <p className="text-lg">
              Instructor: {currentPrintData.courseInstructor}
            </p>
            <p className="text-lg">
              Duration: {currentPrintData.courseDuration}
            </p>
            <div className="mt-12 text-center">
              <p className="text-lg">_________________________</p>
              <p className="text-md">Signature of Instructor/Admin</p>
            </div>
          </div>
        </div>
      )}
    </Tabs>
  );
}
