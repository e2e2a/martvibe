'use server';
import useSWR from 'swr';
export const fetcher = (url: string) => fetch(url).then(res => res.json());

const { data } = useSWR('/api/user', fetcher, {
  refreshInterval: 5000, // re-fetch every 5 seconds
});
