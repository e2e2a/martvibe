'use client';
import { Form } from '@/components/ui/form';
// import { SigninValidator } from '@/lib/validators/signin';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import InputShared from './components/InputShared';
import { ComboboxCategory } from './components/ComboboxCategory';
import useSWR from 'swr';
import { ProductValidator } from '@/lib/validators/product/create';
import TextAreaShared from './components/TextAreaShared';
import useSWRMutation from 'swr/mutation';
import { MutateRequest } from '@/lib/mutation/auth';
import { makeToastError, makeToastSucess } from '../../../../lib/toast';

const Page = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { data: categories, error, isLoading } = useSWR('/api/category');
  const form = useForm<z.infer<typeof ProductValidator>>({
    resolver: zodResolver(ProductValidator),
    shouldFocusError: true,
    defaultValues: {
      name: '',
      description: '',
      price: '',
      weightUnit: '',
      weightValue: '',
      quantity: '',
      unit: 'pcs',
      unitValue: '1',
      category: [],
    },
  });

  const {
    trigger,
    isMutating,
    error: mutateError,
  } = useSWRMutation('/api/product/create', MutateRequest);
  const onSubmit = async (data: z.infer<typeof ProductValidator>) => {
    try {
      const result = await trigger(data);
      if (result.success) {
        form.reset();
        makeToastSucess(result.message);
      } else {
        makeToastError(result.message);
      }
      return;
    } catch (err) {
      return makeToastError(err as string);
    }
  };

  return (
    <div className="py-5 border bg-white rounded-sm">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="space-y-3">
          <CardTitle className="text-lg xs:text-2xl sm:text-3xl text-center w-full ">
            Create Product
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            &nbsp;&nbsp;&nbsp;&nbsp;Create a new product by providing the necessary details below.
            Add information like the product's name, category, description, and more to expand your
            product catalog. This will help organize your offerings and enhance your customers'
            shopping experience. Let&apos;s start building your product catalog!
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <CardContent className="w-full ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComboboxCategory
                  name={'category'}
                  selectItems={categories}
                  form={form}
                  label={'Select Category:'}
                  placeholder={'Select Category:'}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
                <InputShared
                  name={'name'}
                  type={'text'}
                  form={form}
                  label={'Product name:'}
                  classNameInput={''}
                  disabled={false}
                />
                <InputShared
                  name={'weightUnit'}
                  type={'text'}
                  form={form}
                  label={'Weight Unit:'}
                  classNameInput={''}
                  disabled={false}
                />
                <InputShared
                  name={'weightValue'}
                  type={'text'}
                  form={form}
                  label={'Weight Value:'}
                  classNameInput={''}
                  disabled={false}
                />
                <InputShared
                  name={'quantity'}
                  type={'number'}
                  form={form}
                  label={'Quantity:'}
                  classNameInput={''}
                  disabled={false}
                />
                <InputShared
                  name={'price'}
                  type={'text'}
                  form={form}
                  label={'Product price:'}
                  classNameInput={''}
                  disabled={false}
                />
                <InputShared
                  name={'unit'}
                  type={'text'}
                  form={form}
                  label={'Unit:'}
                  classNameInput={''}
                  disabled={true}
                />
                <InputShared
                  name={'unitValue'}
                  type={'text'}
                  form={form}
                  label={'Unit value:'}
                  classNameInput={''}
                  disabled={true}
                />
              </div>

              <div className="w-full">
                <TextAreaShared
                  name={'description'}
                  type={'text'}
                  form={form}
                  label={'Product Description...'}
                  classNameInput={''}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-center md:justify-end items-center mt-4">
                <Button
                  type="submit"
                  disabled={isMutating}
                  variant={'default'}
                  className="cursor-pointer font-semibold"
                >
                  Submit
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
