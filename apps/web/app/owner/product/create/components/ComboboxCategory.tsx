import * as React from 'react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface IProps {
  name: string;
  form: any;
  label: string;
  selectItems: any;
  placeholder: string;
  selectedItems: any[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ComboboxCategory({
  form,
  name,
  label,
  selectItems,
  placeholder,
  selectedItems,
  setSelectedItems,
}: IProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    form.setValue(name, selectedItems);
  }, [selectedItems, form, name]);

  const handleSelect = (id: string) => {
    setSelectedItems(prevSelected => {
      const idAlreadySelected = prevSelected.includes(id);

      if (idAlreadySelected) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="w-full bg-gray-50 rounded-lg">
              <Popover open={open} onOpenChange={setOpen}>
                <div className="border flex w-full">
                  <Label
                    htmlFor={name}
                    className="bg-gray-50 text-black font-medium items-center flex px-1 text-sm pointer-events-none text-nowrap"
                  >
                    {label}
                  </Label>
                  <div className="flex-1">
                    <PopoverTrigger
                      className="data-[state=open]:ring-1 data-[state=open]:ring-orange-400"
                      id={name}
                      asChild
                    >
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          'w-full bg-gray-50 justify-start flex  rounded-sm ring-0 focus:ring-0 relative',
                          form.formState.errors[name] && 'border-red-500 text-red-500'
                        )}
                        onClick={() => setOpen(!open)}
                      >
                        {field.value &&
                          field.value.length > 0 &&
                          field.value
                            .map((value: string) => {
                              const item = selectItems.find((item: any) => item.id === value);
                              return item && item.name;
                            })
                            .join(', ')}
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </div>
                </div>
                <PopoverContent align="start" className="w-full p-0 bg-white border-gray-300">
                  <Command className="w-full">
                    <CommandInput placeholder="Search Category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {selectItems &&
                          selectItems.length > 0 &&
                          selectItems.map((item: any, idx: number) => (
                            <CommandItem key={idx} onSelect={() => handleSelect(item.id)}>
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  field.value.includes(item.id) ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {item.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className="text-red-500 pl-2" />
        </FormItem>
      )}
    />
  );
}
