import React, {
  useEffect,
  useState,
  createContext,
  JSX,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {  motion } from "motion/react";
import { Academic } from "@/types";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  scrollLeftValue?: number;
  scrollRightValue?: number;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0, scrollLeftValue = -300, scrollRightValue = 300 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollLeftValue, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollRightValue, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
      <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <div
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  academic,
  index,
  layout = false,
  isActive,
  setIsActive,
}: {
  academic: Academic;
  index: number;
  layout?: boolean;
  isActive: string;
  setIsActive: React.Dispatch<string>;
}) => {


  return (
    <>
      <motion.button
        onClick={() => setIsActive(academic.title)}
        data-index={index}
        layoutId={layout ? `card-${academic.title}` : undefined}
        className={cn("relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-52 dark:bg-neutral-900 transition-all duration-300", isActive == academic.title ? "md:w-96" : "md:w-80")}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {academic.title}
          </motion.p>
        </div>
        <BlurImage
          src={academic.image}
          alt={academic.title}
          fill
          width={400}
          height={600}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
    height,
    width,
    src,
    className,
    alt,
    crossOrigin, // Add this property
    fill,
    ...rest
  }: {
    height: number;
    width: number;
    src: string;
    className?: string;
    alt?: string;
    crossOrigin?: 'anonymous' | 'use-credentials'; // Define the type
    fill?: boolean;
  }) => {
    const [isLoading, setLoading] = useState(true);
    return (
      <img
        className={cn(
          "h-full w-full transition duration-300",
          isLoading ? "blur-sm" : "blur-0",
          fill && "object-cover",
          className,
        )}
        onLoad={() => setLoading(false)}
        src={`/storage/${src}`}
        width={width}
        height={height}
        alt={alt ? alt : "Background of a beautiful view"}
        crossOrigin={crossOrigin} // Use the property
        {...rest}
      />
    );
  };
