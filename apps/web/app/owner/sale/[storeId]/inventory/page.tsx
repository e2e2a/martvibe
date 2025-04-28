'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import SkeletonPage from './components/SkeletonPage';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SaleWithProduct } from '@/types';
import { Decimal } from '@prisma/client/runtime/index-browser';

export default function Page() {
  const [sales, setSales] = useState<SaleWithProduct[] | null>([]);
  const [total, setTotal] = useState<Decimal>(new Decimal(0));
  const { data: dataA, error, isLoading } = useSWR('/api/sale/get');

  useEffect(() => {
    console.log('data', dataA);
    if (dataA && dataA.sales.length > 0) {
      const getUniqueSalesByProductIdAndPrice = (): SaleWithProduct[] => {
        const uniqueSales = dataA.sales.reduce(
          (acc: SaleWithProduct[], currentSale: SaleWithProduct) => {
            // Check if there's already a sale with the same productId and price in the accumulator
            const existingSale = acc.find(
              sale => sale.productId === currentSale.productId && sale.price === currentSale.price
            );
            if (existingSale) {
              // If it exists, update the quantity and total
              existingSale.quantity += currentSale.quantity;
              existingSale.total = new Decimal(existingSale.total).add(currentSale.total);
            } else {
              // If it doesn't exist, add the current sale to the accumulator
              acc.push(currentSale);
            }

            return acc;
          },
          []
        );
        const total = uniqueSales.reduce((sum: Decimal, sale: SaleWithProduct) => {
          return sum.add(sale.total); // Sum all unique sales' totals
        }, new Decimal(0));
        setTotal(total);
        return uniqueSales;
      };

      setSales(getUniqueSalesByProductIdAndPrice());
      console.log('getUniqueSalesByProductIdAndPrice', getUniqueSalesByProductIdAndPrice());
    }
    return;
  }, [dataA]);

  return (
    <div className="bg-white min-h-[86vh] py-5 px-1 sm:px-5 rounded-sm border">
      <div className="">
        <div className="flex items-center py-4 w-full justify-center">
          <h1 className="sm:text-5xl text-xl font-bold text-primary italic">Inventory Sales</h1>
        </div>
        <div className="overflow-x-scroll">
          <Table>
            <TableCaption className="">
              <div className="w-full flex flex-col py-3 items-start">
                <div className="col-span-1">Total Sales: {Number(total).toFixed(2)} </div>
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Product Name</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Weight Unit</TableHead>
                <TableHead className="text-center">Weight Value</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <SkeletonPage />
              ) : (
                <>
                  {sales &&
                    sales.length > 0 &&
                    sales.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.product.name}</TableCell>
                        <TableCell className="text-center">
                          {(Number(item.price) || 0).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-center">{item.product.weightUnit}</TableCell>
                        <TableCell className="text-center">{item.product.weightValue}</TableCell>
                        <TableCell className="text-center">
                          {(Number(item.total) || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>

        {/*  */}
      </div>
    </div>
  );
}
