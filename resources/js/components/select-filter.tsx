import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Label } from './ui/label';

interface SelectFilterProps {
  title: string;
  label: string;
  items: string[];
  stateFilter: string[];
  setStateFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

export function SelectFilter({
  title,
  label,
  items,
  stateFilter,
  setStateFilter,
}: SelectFilterProps) {
  return (
    <div className="grid w-full space-y-2">
      <Label htmlFor="tingkat">Tingkat</Label>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-muted-foreground relative w-full rounded border p-2 px-2 text-start capitalize">
          {stateFilter.length ? stateFilter.join(', ') : `Semua ${title}`}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:w-[23.5rem]">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem
              key={item}
              onClick={() =>
                stateFilter.includes(item)
                  ? setStateFilter(
                      stateFilter.filter((state) => state !== item),
                    )
                  : setStateFilter([...stateFilter, item])
              }
              className="capitalize"
            >
              <Checkbox checked={stateFilter.includes(item)} />
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
