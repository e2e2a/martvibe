'use client';
import React from 'react';
import useSWR from 'swr';

export default function Page() {
  const { data, error, isLoading } = useSWR('/api/product/get');
  console.log('data', data);
  return (
    <div className="bg-white min-h-[86vh] py-5 px-5 rounded-sm border">
      {isLoading ? (
        <span>skeleton here</span>
      ) : (
        <div className="">
          <div className="flex items-center py-4 w-full justify-center">
            <h1 className="sm:text-5xl text-xl font-bold text-primary italic">Inventory Sales</h1>
          </div>
          {/* <DataTable columns={columns} data={data.products as ProductWithCategory[]} /> */}
        </div>
      )}
    </div>
  );
}
