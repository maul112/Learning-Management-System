import { Card, Carousel } from '@/components/ui/apple-cards-carousel';
import { motion } from 'framer-motion';
import {
  Award,
  Book,
  ChartNoAxesColumnIncreasing,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { RootContent } from './root-content';
import { Separator } from './ui/separator';

export function CardsCarousel() {
  const [isActive, setIsActive] = useState<Set<string>>(
    new Set(['Android Developer']),
  );

  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={card}
      index={index}
      isActive={isActive}
      setIsActive={setIsActive}
    />
  ));

  const cardDetails = dataCardDetails.map((card, index) => (
    <CardDetails key={index} card={card} />
  ));

  const updateDetails = (col: keyof (typeof dataCardDetails)[0]) => {
    const foundItem = dataDetails.find(
      (item) => item.title === (Array.from(isActive.values())[0] as string),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return foundItem ? (foundItem as any)[col] : '';
  };

  return (
    <RootContent>
      <section className="h-full w-full px-10">
        <Carousel items={cards} />
      </section>
      <section className="bg-muted mx-10 mb-10 flex flex-col items-center justify-between py-10 lg:flex-row rounded-xl">
        <div className="w-full px-7 lg:w-[30rem]">
          <h2 className="mb-3 text-3xl font-semibold">
            {updateDetails('title')}
          </h2>
          <p className="text-muted-foreground mb-3 flex gap-2 text-sm">
            <Book className="h-4 w-4" />
            {updateDetails('duration')} Kelas
          </p>
          <p className="text-muted-foreground mb-3 flex gap-2 text-sm">
            <Users className="h-4 w-4" />
            {updateDetails('users')} siswa belajar di learning path ini
          </p>
          <Separator className="bg-muted-foreground mb-5" />
          <p className="text-muted-foreground leading-relaxed">
            {updateDetails('description')}
          </p>
        </div>
        <div className="h-[34rem] w-full overflow-hidden lg:w-2xl">
          <Carousel items={cardDetails} />
        </div>
      </section>
    </RootContent>
  );
}

function CardDetails({
  card,
}: {
  card: {
    order: number;
    title: string;
    ratings: number;
    difficulty: string;
    description: string;
    duration: string;
    image: string;
    users: string;
  };
}) {
  return (
    <motion.div
      whileHover={{
        y: -130,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: 'easeInOut',
        },
      }}
      className="bg-accent-foreground w-74 overflow-hidden rounded-xl"
    >
      <div className="bg-muted-foreground h-56 w-full"></div>
      <div className="p-4">
        <p className="text-muted mb-3 flex items-center gap-2 text-sm font-semibold">
          <ChartNoAxesColumnIncreasing className="h-4 w-4" />
          Langkah {card.order}
        </p>
        <h3 className="text-md text-muted mb-7 font-semibold">{card.title}</h3>
        <p className="text-muted mb-3 flex items-center gap-2 text-sm">
          <Star className="h-4 w-4" fill="yellow" />
          {card.ratings}
        </p>
        <p className="text-muted mb-7 flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-blue-500" />
          Level {card.difficulty}
        </p>
        <p className="text-muted mb-7 flex items-center gap-2 text-sm">
          <Book className="h-4 w-4" />
          {card.description}
        </p>
        <div className="mb-2 flex items-center gap-5">
          <p className="text-muted flex items-center gap-2 text-sm">
            <Book className="h-4 w-4" />
            {card.duration}
          </p>
          <p className="text-muted flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            {card.users}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const data = [
  {
    title: 'Android Developer',
    src: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Back-End Developer',
    src: 'https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Front-End Developer',
    src: 'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },

  {
    title: 'ios Developer',
    src: 'https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Machine Learning',
    src: 'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Lihat semua path',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const dataDetails = [
  {
    title: 'Android Developer',
    module: 10,
    users: '100k',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
  },
  {
    title: 'Back-End Developer',
    module: 20,
    users: '200k',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
  },
  {
    title: 'Front-End Developer',
    module: 30,
    users: '300k',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
  },
  {
    title: 'ios Developer',
    module: 40,
    users: '400k',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
  },
  {
    title: 'Machine Learning',
    module: 50,
    users: '500k',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
  },
];

const dataCardDetails = [
  {
    order: 1,
    title: 'Memulai Pemrograman dengan Kotlin',
    ratings: 4.5,
    difficulty: 'Dasar',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
    duration: '2 jam',
    image:
      'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    users: '100k',
  },
  {
    order: 2,
    title: 'Memulai Pemrograman dengan Kotlin',
    ratings: 4.5,
    difficulty: 'Dasar',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
    duration: '2 jam',
    image:
      'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    users: '100k',
  },
  {
    order: 3,
    title: 'Memulai Pemrograman dengan Kotlin',
    ratings: 4.5,
    difficulty: 'Dasar',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
    duration: '2 jam',
    image:
      'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    users: '100k',
  },
  {
    order: 4,
    title: 'Memulai Pemrograman dengan Kotlin',
    ratings: 4.5,
    difficulty: 'Dasar',
    description:
      'Pelajari dasar bahasa pemrograman, function programing, object-oriented programming, dan lain sebagainya',
    duration: '2 jam',
    image:
      'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    users: '100k',
  },
];
