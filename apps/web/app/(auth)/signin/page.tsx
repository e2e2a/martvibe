'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SigninValidator } from '@/lib/validators/signin';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { MutateRequest } from '@/lib/mutation/auth';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const session = useSession();
  console.log('session', session);
  useEffect(() => {
    if (session && session.status === 'authenticated') {
      console.log('running');
      router.push('/');
    }
  }, [session, router]);
  if (session && session.status === 'authenticated') return null;
  const form = useForm<z.infer<typeof SigninValidator>>({
    resolver: zodResolver(SigninValidator),
    shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { trigger, isMutating, error } = useSWRMutation('/api/auth/signin', MutateRequest);
  const onSubmit = async (data: z.infer<typeof SigninValidator>) => {
    // const hashed = await hashPassword(data.password); // move this to register
    // data.password = hashed;
    try {
      const result = await trigger(data);
      switch (result.role) {
        case 'OWNER':
          window.location.href = '/owner';
          break;
        case 'SELLER':
          window.location.href = '/seller';
          break;
      }
      return;
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return (
    <div className="bg-neutral-100 ">
      <div className="sm:grid flex sm:grid-cols-2 pt-[20%] sm:pt-[10%] items-center sm:items-start flex-col h-screen">
        <div className=" flex-col md:pl-[15%] pr-0 sm:pr-[5%] w-full">
          <h1 className="font-bold sm:text-5xl text-2xl w-full text-center sm:text-start">
            <span className="text-primary italic sm:text-8xl text-6xl">M</span>
            art
            <span className="text-primary sm:text-6xl text-4xl">V</span>
            ibe
          </h1>
          <div className="text-lg font-semibold font-poppins hidden justify-start w-full sm:flex">
            Your all-in-one tool for smart inventory tracking and effortless selling.
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white w-auto sm:w-96 p-5 rounded-md ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">
                <div className="space-y-4">
                  {/* {message && <FormMessageDisplay message={message} typeMessage={typeMessage} />} */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isMutating}
                            placeholder="Email"
                            type="email"
                            className="focus-visible:ring-1 bg-gray-50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isMutating}
                            placeholder="Password"
                            type="password"
                            className="focus-visible:ring-1 bg-gray-50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" variant={'default'} disabled={isMutating} className="w-full ">
                  Sign In
                </Button>
              </form>
            </Form>
            <div className="mt-1">
              <div className="flex items-center w-full">
                <Button
                  size="lg"
                  className="w-full flex gap-4"
                  variant="outline"
                  onClick={() => {
                    setIsPending(true);
                    signIn('google');
                  }}
                  disabled={isMutating}
                  type="submit"
                >
                  Continue with Google <FcGoogle className="h-7 w-7" />
                </Button>
              </div>
              <div className="w-full flex flex-col items-end mt-4">
                <Link href={'/recovery'} className="text-xs text-blue-600 hover:underline">
                  Create New Account
                </Link>
                <Link href={'/recovery'} className="text-xs text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
