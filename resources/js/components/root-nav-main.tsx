import { NavMenu } from './navigation-menu';

export function RootNavMain() {
  return (
    <div className="flex items-center gap-2">
      <NavMenu title="Learning Path" href="/learning-paths?redirect=true" />
      <NavMenu title="Forum Diskusi" href="/discussions" />
    </div>
  );
}
