import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  username: string;
  seller_store: any[];
  store_owner: any[];
  role: 'ADMIN' | 'BUYER' | 'SELLER' | 'OWNER';
};

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: 'ADMIN' | 'BUYER' | 'SELLER' | 'OWNER';
  }
}
