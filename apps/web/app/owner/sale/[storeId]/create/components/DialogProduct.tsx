import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/generated/prisma';
import Image from 'next/image';
import DropdownWeight from './DropdownWeight';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Decimal } from '@/generated/prisma/runtime/library';
import useSWRMutation from 'swr/mutation';
import { MutateRequest } from '@/lib/mutation/auth';
import { makeToastError, makeToastSucess } from '@/lib/toast';
import { AlertDialogProduct } from './AlertDialogProduct';

type WeightUnit = {
  id: number;
  weightUnit: string | null;
  price: Decimal;
  name: string;
};

export default function DialogProduct({
  product,
  weights,
}: {
  product: Product;
  weights: WeightUnit[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [increment, setIncrement] = useState(1);
  const [productId, setProductId] = useState(0);
  const [open, setOpen] = useState(false);

  const handleDecrement = () => {
    if (quantity > 0) {
      if (quantity < increment) {
        setQuantity(0);
      } else {
        setQuantity(quantity - increment);
      }
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + increment);
  };

  const handleSetIncrement = (value: number) => {
    setIncrement(value);
  };

  const { trigger, isMutating, error } = useSWRMutation('/api/sale/create', MutateRequest);
  const handleMutation = async () => {
    const data = { productId, quantity };
    try {
      if (data.productId <= 0) return makeToastError('Product weight is Required');
      const result = await trigger(data);
      if (result.success) {
        setOpen(false);
        return makeToastSucess(result.message);
      } else {
        return makeToastError(result.message);
      }
    } catch (err) {
      // console.error('Login failed:', err);
    } finally {
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={e => {
        setOpen(e);
        setProductId(0);
      }}
    >
      <DialogTrigger asChild className="h-32 w-32 sm:h-36 sm:w-36 group cursor-pointer">
        <div className="flex flex-col items-center shrink-0">
          <div className="h-32 w-32 sm:h-36 sm:w-36">
            <Image
              priority
              height={250}
              width={250}
              alt={`${product.name}-${product.id}`}
              className="bg-accent rounded-sm group-hover:scale-110 duration-150 group-hover:border-primary group-hover:border" //make this scale 1s
              src={product.imageUrl || '/product/product-default.png'}
            />
          </div>
          <div className="font-bold text-primary/80">{product.name}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] mt-5 mb-5 sm:mt-0 sm:mb-0 max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center text-primary/80">Create Sales</DialogTitle>
          <DialogDescription>
            Create sales for the products that are being sold today. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32">
              <Image
                priority
                height={250}
                width={250}
                alt={`${product.name}-${product.id}`}
                className="bg-accent rounded-sm"
                src={product.imageUrl || '/product/product-default.png'}
              />
            </div>
            <div className="flex sm:px-5 w-full">
              <DropdownWeight
                weigths={weights as WeightUnit[]}
                setProductId={setProductId}
                productId={productId}
              />
            </div>
            <div className="flex flex-row items-center gap-x-1 sm:px-5 w-full">
              <span className="text-muted-foreground text-[15px] text-nowrap">Price Sold:</span>
              <Input
                type="text"
                className=" border-primary"
                disabled
                value={parseFloat((Number(product.price) * quantity).toString()).toFixed(2)}
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                className="bg-accent font-bold h-8 w-8 sm:h-11 sm:w-13 flex items-center justify-center hover:border hover:border-primary cursor-pointer"
                onClick={handleDecrement}
              >
                -
              </button>
              <div className="bg-accent text-xl italic font-bold h-8 w-24 sm:h-10 sm:w-30 flex items-center justify-center">
                {quantity}
              </div>
              <button
                className="bg-accent font-bold h-7 w-7 sm:h-11 sm:w-13 flex items-center justify-center hover:border hover:border-primary cursor-pointer"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-3 gap-x-3 md:gap-x-6  lg:gap-x-10 mt-4">
              <div
                className={`bg-accent text-xl italic font-bold h-14 w-14 sm:h-20 sm:w-20 flex items-center justify-center hover:border hover:border-primary cursor-pointer ${increment === 1 && 'border border-primary'}`}
                onClick={() => handleSetIncrement(1)} // Set increment to 1
              >
                1
              </div>
              <div
                className={`bg-accent text-xl italic font-bold h-14 w-14 sm:h-20 sm:w-20 flex items-center justify-center hover:border hover:border-primary cursor-pointer ${increment === 5 && 'border border-primary'}`}
                onClick={() => handleSetIncrement(5)} // Set increment to 5
              >
                5
              </div>
              <div
                className={`bg-accent text-xl italic font-bold h-14 w-14 sm:h-20 sm:w-20 flex items-center justify-center hover:border hover:border-primary cursor-pointer ${increment === 10 && 'border border-primary'}`}
                onClick={() => handleSetIncrement(10)} // Set increment to 10
              >
                10
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <AlertDialogProduct handleMutation={handleMutation} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
