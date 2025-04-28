'use client';
import { SidebarItems } from '@/types';
import { ChevronRight, Layers, Package, PackagePlus, Search, Tag } from 'lucide-react';

export const ownerSidebar: SidebarItems[] = [
  {
    title: 'Home',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Products',
    icon: ChevronRight,
    items: [
      {
        title: 'Prices',
        url: '#',
        icon: Tag,
      },
      {
        title: 'Classification',
        url: '#',
        icon: Layers,
      },
      {
        title: 'All Products',
        url: '/owner/product/all',
        icon: Package,
      },
      {
        title: 'Search Products',
        url: '#',
        icon: Search,
      },
      {
        title: 'Create Product',
        url: '/owner/product/create',
        icon: PackagePlus,
      },
    ],
  },
  {
    title: 'Sales',
    icon: ChevronRight,
    items: [
      {
        title: 'Search Sales',
        url: '/owner/sale/search',
        icon: Search,
      },
      {
        title: 'View Sales',
        url: '/owner/sale/all',
        icon: Package,
      },
      // {
      //   title: 'Create Sales',
      //   url: '/seller/sale/create',
      //   icon: PackagePlus,
      // },
      {
        title: 'Inventory Sales',
        url: '/owner/sale/inventory',
        icon: Package,
      },
    ],
  },
  {
    title: 'Calendar',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Search',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Settings',
    url: '#',
    icon: ChevronRight,
  },
];

export const sellerSidebar: SidebarItems[] = [
  {
    title: 'Home',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Products',
    icon: ChevronRight,
    items: [
      {
        title: 'All Products',
        url: '/owner/product/all',
        icon: Package,
      },
      {
        title: 'Search Products',
        url: '#',
        icon: Search,
      },
    ],
  },
  {
    title: 'Sales',
    icon: ChevronRight,
    items: [
      {
        title: 'Search Sales',
        url: '/seller/sale/search',
        icon: Search,
      },
      {
        title: 'View Sales',
        url: '/seller/sale/all',
        icon: Package,
      },
      {
        title: 'Create Sales',
        url: '/seller/sale/create',
        icon: PackagePlus,
      },
      // {
      //   title: 'Inventory Sales',
      //   url: '/seller/sale/inventory',
      //   icon: Package,
      // },
    ],
  },
  {
    title: 'Calendar',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Search',
    url: '#',
    icon: ChevronRight,
  },
  {
    title: 'Settings',
    url: '#',
    icon: ChevronRight,
  },
];
