'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Decimal } from '@/custom/generated/prisma/runtime/library';

type WeightUnit = {
  id: number;
  weightUnit: string | null;
  price: Decimal;
  name: string;
};

export default function DropdownWeight({
  weigths,
  productId,
  setProductId,
}: {
  weigths: WeightUnit[];
  productId: number;
  setProductId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col shrink-0 w-full">
      {productId <= 0 && (
        <span className="text-sm text-red-400 font-sans">Product weight is required*</span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {productId
              ? weigths.find(w => w.id === productId)?.weightUnit
              : 'Select Weight Unit...'}{' '}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[250px] lg:-0">
          <Command>
            <CommandInput placeholder="Search weight unit..." className="h-9" />
            <CommandList>
              <CommandEmpty>No weight unit found.</CommandEmpty>
              <CommandGroup>
                {weigths.map(w => (
                  <CommandItem
                    key={w.id}
                    value={w.weightUnit!}
                    onSelect={() => {
                      setProductId(productId === w.id ? 0 : w.id);
                      setOpen(false);
                    }}
                  >
                    {w.weightUnit}
                    <Check
                      className={cn('ml-auto', productId === w.id ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
