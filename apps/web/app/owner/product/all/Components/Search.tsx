'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Check, Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IProps {
  setSearchBy: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBy = ({ setSearchBy }: IProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('name');
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        <Ellipsis />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="mt-2 bg-white w-full flex flex-col justify-start border-gray-300 "
      >
        <Command className="w-full">
          <CommandList className="w-full max-h-[200px]">
            <CommandGroup className="w-full">
              <div className="text-sm mb-1">Search By</div>
              <CommandItem
                key={0}
                value={'name'}
                className="w-auto"
                onSelect={currentValue => {
                  setValue(currentValue);
                  setSearchBy(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn('mr-2 h-4 w-4', value === 'name' ? 'opacity-100' : 'opacity-0')}
                />
                Descriptive Title
              </CommandItem>
              <CommandItem
                key={1}
                value={'Subject Code'}
                className="w-auto"
                onSelect={currentValue => {
                  setSearchBy(currentValue);
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === 'Subject Code' ? 'opacity-100' : 'opacity-0'
                  )}
                />
                Subject Code
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBy;
