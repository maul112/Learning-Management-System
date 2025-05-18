import { useInitials } from '@/hooks/use-initials';
import { Academic } from '@/types';
import { ArrowRight, StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ShineBorder } from './ui/shine-border';

export function RatingsSection({ academic }: { academic: Academic }) {
  const getInitials = useInitials();
  const ratingsSliced = academic.courses.map((course) =>
    course.ratings.find((rating) => rating.rating >= 4),
  );

  return (
    <div id={academic.title} className="grid gap-10 pt-32">
      <h2 className="w-xl text-5xl">Testimoni {academic.title}</h2>
      <div className="grid grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
        {ratingsSliced.map((rating) => (
          <Card key={rating?.id} className="relative">
            <CardHeader>
              <div className="flex gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={'/storage/' + rating?.student.user.avatar}
                    alt={rating?.student.user.name}
                  />
                  <AvatarFallback>
                    {getInitials(rating!.student.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="mt-2">
                    {rating?.student.user.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <span className="text-muted-foreground flex gap-2">
                      {Array.from({ length: 5 }, (_, k) => (
                        <StarIcon
                          key={k}
                          className="h-4 w-4 text-amber-400"
                          fill={k < rating!.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground line-clamp-4 text-sm">
              {rating?.comment}
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="group cursor-pointer">
                    Baca Selengkapnya
                    <ArrowRight className="transition-all duration-100 group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={'/storage/' + rating?.student.user.avatar}
                            alt={rating?.student.user.name}
                          />
                          <AvatarFallback>
                            {getInitials(rating!.student.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3>{rating?.student.user.name}</h3>
                      </div>
                    </DialogTitle>
                    <DialogDescription>{rating?.comment}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
          </Card>
        ))}
      </div>
    </div>
  );
}
