import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface IProps {
  name: string;
  type: string;
  form: any;
  label: string;
  classNameInput?: string;
}

const TextAreaShared = ({ name, type, form, label, classNameInput }: IProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="grid w-full gap-1.5 mt-[3%]">
              <Label className="capitalize flex items-center gap-0" htmlFor={name}>
                {name} <span className="text-xs text-muted-foreground">(optional)</span>
              </Label>
              <Textarea placeholder={label} id={name} className="focus-visible:ring-1 bg-gray-50" />
            </div>
          </FormControl>
          <FormMessage className="text-red-500 pl-2" />
        </FormItem>
      )}
    />
  );
};

export default TextAreaShared;
