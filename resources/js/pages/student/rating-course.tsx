import InputError from '@/components/input-error'; // Asumsi Anda punya komponen ini
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import StudentLayout from '@/layouts/student-layout';
import { Course, SharedData, Student } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react'; // Tambahkan Link
import { LoaderCircle, Star } from 'lucide-react'; // Import Star dan LoaderCircle
import { useEffect } from 'react'; // Import useState, useEffect
import { toast } from 'sonner'; // Import toast

// Tentukan tipe data props yang akan diterima halaman
interface RatingCoursePageProps extends SharedData {
  course: Course; // Model Course yang akan di-rate
  student: Student; // Data Student yang login (jika diperlukan detailnya)
  existingRating: { rating: number; comment: string | null } | null; // Rating yang sudah ada (jika ada)
}

export default function RatingCourse() {
  const { course, success, error, existingRating } =
    usePage<RatingCoursePageProps>().props;

  // Inisialisasi form dengan rating yang sudah ada atau default
  const { data, setData, post, processing, errors } = useForm({
    rating: existingRating?.rating || 0, // Default 0 atau rating yang sudah ada
    comment: existingRating?.comment || '',
  });

  // Efek untuk menampilkan toast jika ada flash message dari backend
  useEffect(() => {
    if (success) toast.success(success as string);
    if (error) toast.error(error as string);
  }, [success, error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route('courses.rate.store', course.id), {
      preserveScroll: true, // Pertahankan posisi scroll setelah submit
      onError: (e) => console.error('Error submitting rating:', e),
    });
  };

  return (
    <StudentLayout>
      <Head title={`Rate ${course.title}`} />
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-10 md:py-14">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="mb-2 text-2xl font-bold">
              Berikan Penilaian untuk Kursus ini
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {course.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bagian Rating Bintang */}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating Anda (1-5 Bintang)</Label>
                <RadioGroup
                  value={String(data.rating)} // RadioGroup value harus string
                  onValueChange={(value) => setData('rating', Number(value))}
                  className="flex items-center gap-2"
                >
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Label
                      key={starValue}
                      htmlFor={`star-${starValue}`}
                      className={`cursor-pointer text-gray-400 transition-colors hover:text-yellow-500 ${
                        data.rating >= starValue ? 'text-yellow-500' : ''
                      }`}
                    >
                      <RadioGroupItem
                        value={String(starValue)}
                        id={`star-${starValue}`}
                        className="sr-only" // Sembunyikan input radio asli
                      />
                      <Star fill="currentColor" className="h-8 w-8" />
                    </Label>
                  ))}
                </RadioGroup>
                {errors.rating && (
                  <InputError message={errors.rating} className="mt-1" />
                )}
              </div>

              {/* Bagian Komentar */}
              <div className="space-y-2">
                <Label htmlFor="comment">Komentar (Opsional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Bagikan pengalaman Anda tentang kursus ini..."
                  value={data.comment}
                  onChange={(e) => setData('comment', e.target.value)}
                  rows={4}
                  maxLength={1000} // Batasi panjang komentar
                />
                {errors.comment && (
                  <InputError message={errors.comment} className="mt-1" />
                )}
                <p className="text-muted-foreground text-right text-sm">
                  {data.comment.length} / 1000 karakter
                </p>
              </div>

              {/* Tombol Submit */}
              <Button type="submit" disabled={processing || data.rating === 0}>
                {processing && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {existingRating ? 'Perbarui Penilaian' : 'Kirim Penilaian'}
              </Button>
              {/* Tombol kembali */}
              <Link
                href={route('student.academic')}
                className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground ml-2 inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Kembali
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
