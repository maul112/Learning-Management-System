import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Reorder } from 'framer-motion';
import { Edit2, List } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface DragableListItem extends Record<string, unknown> {
  id: string;
  title: string;
  order: number;
  type?: string;
  status: string;
}

export function DragableList({
  data,
  endpoint,
}: {
  data: DragableListItem[];
  endpoint: string;
}) {
  const [items, setItems] = useState(data.map((item) => item.id));
  const dataById = Object.fromEntries(data.map((item) => [item.id, item]));
  const prevItems = useRef<string[]>(items);

  const sendReorder = async (newItems: string[]) => {
    try {
      await axios.post(route('courses.reorder'), {
        ids: newItems,
      });
      toast.success('Course order updated!');
    } catch (error) {
      toast.error('Failed to reorder items');
      console.log(error);
    }
  };

  const handleDragEnd = () => {
    if (JSON.stringify(prevItems.current) !== JSON.stringify(items)) {
      sendReorder(items);
      prevItems.current = items;
    }
  };

  useEffect(() => {
    setItems(data.map((item) => item.id));
    prevItems.current = data.map((item) => item.id);
  }, [data]);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="flex flex-col gap-3"
    >
      {items.map((id) => {
        const item = dataById[id];
        if (!item) return null;

        return (
          <Reorder.Item
            key={item.id}
            value={item.id}
            dragListener={true}
            onDragEnd={handleDragEnd}
          >
            <Card className="text-xs">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <List className="cursor-grab" />
                  {item.title}
                </div>
                <div className="flex items-center gap-2">
                  {item.type && <Badge>{item.type}</Badge>}
                  <Badge
                    variant={
                      item.status === 'published' ? 'default' : 'secondary'
                    }
                  >
                    {item.status}
                  </Badge>
                  <Link href={route(`${endpoint}s.edit`, item.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
