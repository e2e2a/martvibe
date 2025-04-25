'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductWithCategory } from '@/types';
import Image from 'next/image';
// import ActionsCell from './ActionsCell';

export const columns: ColumnDef<ProductWithCategory>[] = [
  // {
  //   accessorFn: (row) => row.fixedRateAmount,
  //   id: 'rate amount.',
  //   header: 'Rate Amount.',
  //   cell: ({ cell, row }) => {
  //     const user = row.original;
  //     return (
  //       <div key={cell.id} className=' uppercase'>
  //         {user?.fixedRateAmount}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorFn: row => row.imageUrl,
    id: 'imageUrl',
    header: 'Product Image',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="flex items-center justify-center">
          <div className="border border-primary shadow-md drop-shadow-sm bg-accent">
          <Image
            height={250}
            width={250}
            src={user?.imageUrl || '/product/product-default.png'}
            alt="product-image"
            className='h-10 w-10'
            priority
          />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user?.name}
        </div>
      );
    },
    accessorFn: row => {
      const { name } = row;
      return `${name}`;
    },
    filterFn: (row, columnId, filterValue) => {
      const fullName = `${row.original.name}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase());
    },
  },
  {
    accessorFn: row => row.price,
    accessorKey: 'price',
    header: 'Price',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="flex justify-center items-center">
          {Number(user.price).toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorFn: row => row.weightUnit,
    id: 'weightUnit',
    header: 'Weight Unit',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user.weightUnit}
        </div>
      );
    },
  },
  {
    accessorFn: row => row?.weightValue,
    id: 'weightValue',
    header: 'Weight Value',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user?.weightValue || ''}
        </div>
      );
    },
  },
  {
    accessorFn: row => row.category,
    id: 'category',
    header: 'Category',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user?.category?.map(cat => cat.name).join(', ')}
        </div>
      );
    },
  },
  {
    accessorFn: row => row.quantity,
    id: 'quantity',
    header: 'Quantity',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user.quantity}
        </div>
      );
    },
  },
  {
    accessorFn: row => row.unit,
    id: 'unit',
    header: 'Unit',
    cell: ({ cell, row }) => {
      const user = row.original;
      return (
        <div key={cell.id} className="">
          {user.unit}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formatted = date.toLocaleDateString();

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'UpdatedAt',
    cell: ({ row }) => {
      const date = new Date(row.getValue('updatedAt'));
      const formatted = date.toLocaleDateString();

      return <div className="font-medium">{formatted}</div>;
    },
  },
  //   {
  //     id: 'actions',
  //     header: 'Actions',
  //     cell: ({ row }) => {
  //       const user = row.original;

  //       return <ActionsCell user={user} />;
  //     },
  //   },
];
