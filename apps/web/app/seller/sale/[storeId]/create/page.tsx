'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import SkeletonProducts from './components/SkeletonProducts';
import DialogProduct from './components/DialogProduct';
import { Decimal } from '@prisma/client/runtime/library';
import { Product } from '@/custom/generated/prisma/client';

type WeightUnit = {
  id: number;
  weightUnit: string | null;
  price: Decimal;
  name: string;
};

export default function Page({ params }: { params: Promise<{ storeId: string }> }) {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [weightUnits, setWeightUnits] = useState<WeightUnit[]>([]);
  const { storeId } = React.use(params);

  const { data: dataA, error: errA, isLoading: loadA } = useSWR('/api/category');
  const {
    data: dataB,
    error: errB,
    isLoading: loadB,
  } = useSWR(`/api/product/get?storeId=${storeId || null}`);

  useEffect(() => {
    if (dataB && dataB.products.length > 0) {
      setWeightUnits([]);
      const p = dataB.products as Product[];
      const uniqueProducts = p.reduce<Product[]>((acc, product) => {
        if (!acc.find(p => p.name === product.name)) {
          acc.push(product);
        }
        return acc;
      }, []);
      let weigths: { id: number; weightUnit: string | null; price: Decimal; name: string }[] = [];
      p.map(item => {
        weigths.push({ id: item.id, weightUnit: item.weightUnit, price: item.price, name: item.name });
      });
      setWeightUnits(weigths);
      setProducts(uniqueProducts);
    }
  }, [dataB]);
  return (
    <div className="bg-white min-h-[86vh] py-5 px-1 sm:px-5 rounded-sm border">
      <div className="">
        <div className="flex items-center py-4 text-black w-full justify-center">
          <h1 className="sm:text-5xl text-xl font-bold text-primary/80 italic">Create Sales</h1>
        </div>
        <div className="text-xl font-bold text-muted-foreground">Select Products:</div>
        {loadB ? (
          <SkeletonProducts />
        ) : (
          <>
            {products && products.length > 0 ? (
              <div className="grid  gap-1 grid-cols-2 md:gap-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-5 px-1 sm:px-3">
                {products.map((item, idx) => {
                  const weights = weightUnits.filter(i => i.name === item.name);
                  return <DialogProduct key={idx} weights={weights} product={item as Product} />;
                })}
              </div>
            ) : (
              <div className="flex items-center">No Products</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
