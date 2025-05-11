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

interface Item {
  label: string;
  value: string;
}

interface SelectFilterProps {
  title: string;
  label: string;
  items: Item[];
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
      <Label htmlFor={title}>{label}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-muted-foreground relative w-full rounded border p-2 px-2 text-start capitalize">
          {stateFilter.length ? stateFilter.join(', ') : `Semua ${title}`}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:w-[23.5rem]">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() =>
                stateFilter.includes(item.value)
                  ? setStateFilter(
                      stateFilter.filter((state) => state !== item.value),
                    )
                  : setStateFilter([...stateFilter, item.value])
              }
              className="capitalize"
            >
              <Checkbox checked={stateFilter.includes(item.value)} />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
