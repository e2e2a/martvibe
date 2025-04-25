'use client';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface IProps {
  name: string;
  type: string;
  form: any;
  label: string;
  disabled: boolean;
  classNameInput?: string;
}

const units = ['KG', 'G', 'Liter', 'XXL', 'SMALL', 'LARGE'];
const InputShared = ({ name, type, form, label, disabled, classNameInput }: IProps) => {
  let items: string[] = [];
  if (name === 'weightUnit') items = units;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className=" flex flex-row w-full ">
              <div className="">
                <Label
                  htmlFor={name}
                  className="shrink-0 border bg-gray-50 h-9 text-black font-medium items-center flex px-1 text-sm pointer-events-none text-nowrap"
                >
                  {label}
                </Label>
              </div>
              <div className="flex-1 shrink-0">
                <Input
                  {...field}
                  type={type}
                  list={`${name}-list`}
                  id={name}
                  disabled={disabled}
                  className="focus-visible:ring-1 bg-gray-50"
                />
                <datalist id={`${name}-list`}>
                  {items &&
                    items.length > 0 &&
                    items.map((item, idx) => <option key={idx} value={item} />)}
                </datalist>
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-red-500 pl-2" />
        </FormItem>
      )}
    />
  );
};

export default InputShared;
