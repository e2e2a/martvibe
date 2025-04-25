'use client';
import React from 'react';
import { DataTable } from './Components/DataTable';
import { columns } from './Components/Columns';
import useSWR from 'swr';
import { ProductWithCategory } from '@/types';

const Page = () => {
  const { data, error, isLoading } = useSWR('/api/product/get');
  console.log('data', data);
  return (
    <div className="bg-white min-h-[86vh] py-5 px-5 rounded-sm border">
      {isLoading ? (
        <span>skeleton here</span>
      ) : (
        <div className="">
          {/* <OptionsExport data={subjects || []} /> */}
          <div className="flex items-center py-4 text-black w-full justify-center">
            <h1 className="sm:text-5xl text-xl font-bold text-primary ">All Products</h1>
          </div>
          <DataTable columns={columns} data={data.products as ProductWithCategory[]} />
        </div>
      )}
    </div>
  );
};

export default Page;
