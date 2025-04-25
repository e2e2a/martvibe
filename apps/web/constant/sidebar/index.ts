import {
  ChevronRight,
  Layers,
  Package,
  PackagePlus,
  PhilippinePeso,
  PlusSquare,
  Search,
  Tag,
} from 'lucide-react';

export const ownerSidebar = [
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
