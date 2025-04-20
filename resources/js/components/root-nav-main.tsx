import { NavItem } from '@/types';
import { NavMenu } from './navigation-menu';

const langgananItems: NavItem[] = [
  {
    title: 'Biaya Langganan',
    href: '/subcription/purchase',
  },
  {
    title: 'Aktivasi Token',
    href: '/token/activation',
  },
];

const programItems: NavItem[] = [
  {
    title: 'Program 1',
    href: '#',
  },
  {
    title: 'Program 2',
    href: '#',
  },
];

const lainnyaItems: NavItem[] = [
  {
    title: 'Lainnya 1',
    href: '#',
  },
  {
    title: 'Lainnya 2',
    href: '#',
  },
];

export function RootNavMain() {
  return (
    <div className="flex items-center gap-2">
      <NavMenu title="Learning Path" href="/learning-path" />
      <NavMenu type="dropdown" title="Program" items={langgananItems} />
      <NavMenu type="dropdown" title="Langganan" items={programItems} />
      <NavMenu title="Capaian & Dampak" href="/impact" />
      <NavMenu type="dropdown" title="Lainnya" items={lainnyaItems} />
    </div>
  );
}
