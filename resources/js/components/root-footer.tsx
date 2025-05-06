import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { RootContent } from './root-content';
import { Separator } from './ui/separator';

export function RootFooter() {
  return (
    <RootContent>
      <footer className="my-10 p-5 lg:mx-10">
        <Separator className="bg-accent mb-20" />
        <div className="flex items-center gap-5">
          <div>
            <h3 className="mb-4 text-3xl font-semibold">NextLMS</h3>
            <p className="text-muted-foreground text-sm mb-1">NextLMS Space</p>
            <p className="text-muted-foreground text-sm mb-1">Jl. Kwanyar Barat</p>
            <p className="text-muted-foreground text-sm mb-1">
              Kec. Kwanyar, Kota Bagungan
            </p>
            <p className="text-muted-foreground mb-7 text-sm">Jawa Timur</p>
            <div className="flex items-center gap-7">
              <Instagram />
              <Youtube />
              <Twitter />
              <Facebook />
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </footer>
    </RootContent>
  );
}
