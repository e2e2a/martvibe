import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { createUser, findUserByEmail, findUserById } from './service/user';
import { createAccount, findAccountByUserId } from './service/account';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import { Store } from './generated/prisma';

const isInProductionMode = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

export const { auth, handlers, signIn, signOut } = NextAuth({
  cookies: {
    sessionToken: {
      name: isInProductionMode ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isInProductionMode,
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isInProductionMode,
      },
    },
  },
  debug: isInProductionMode,
  pages: {
    signIn: '/sign-in',
    error: '/auth',
  },
  events: {
    async signOut() {
      // add here
    },
    // async linkAccount({ user, profile }) {
    async linkAccount() {
      //   await dbConnect();
      //   await User.findByIdAndUpdate(user.id, {
      //     emailVerified: new Date(),
      //     lastLogin: new Date(),
      //   });
    },
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          const existingUser = await findUserByEmail(user.email!);
          if (existingUser) {
            if (existingUser.revoke) return false;
            const existAccount = await findAccountByUserId(existingUser.id);
            if (!existAccount) {
              await createAccount({
                ...account,
                expires_at: account.expires_at?.toString(),
                userId: existingUser.id,
              });
            }
            // await updateUserLogin(existingUser._id);
            return true;
            // return false;
          }

          const userData = {
            email: profile?.email!,
            role: undefined,
            // imageUrl: profile?.picture,
            username: undefined,
          };

          const newUser = await createUser(userData);
          await createAccount({
            ...account,
            expires_at: account.expires_at?.toString(),
            userId: newUser.id,
          });
          //   await updateUserLogin(newUser._id as string);
          //   await createProfile(newUser._id, profile);
          return true;
        } else if (account?.provider === 'credentials') {
          const existingUser = await findUserById(Number(user.id));

          // Prevent sign-in without email verification
          if (!existingUser || !existingUser.verified || existingUser.revoke) {
            return false;
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (token && token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.username = token.username as string;
        session.user.seller_store = token.seller_store as Store[];
        session.user.store_owner = token.store_owner as Store[];
      }

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && account.provider === 'credentials') {
        // If the user signs in, cache data in the token
        if (user) {
          const userData = await findUserById(Number(user.id));
          console.log('auth1', userData);
          token.sub = userData?.id.toString();
          (token.seller_store = userData?.profile.store_seller),
            (token.store_owner = userData?.profile.store_owner),
            (token.role = userData?.role!);
          token.username = userData?.username;
        }

        // If no user, but token exists
        if (!user && token.email) {
          const existingUser = await findUserByEmail(token.email);
          if (existingUser) {
            token.sub = existingUser.id.toString();
            token.role = existingUser.role!;
            token.username = existingUser.username;
          } else {
            return null;
          }
        }
      } else if (account && account.provider === 'google') {
        // If the user signs in, cache data in the token
        if (user) {
          const userData = await findUserById(Number(user.id));
          token.sub = userData?.id.toString();
          token.role = userData?.role!;
          token.username = userData?.username;
        }

        // If no user, but token exists
        if (!user && token.email) {
          const existingUser = await findUserByEmail(token.email);
          if (existingUser) {
            token.sub = existingUser.id.toString();
            token.role = existingUser.role!;
            token.username = existingUser.username;
          } else {
            return null;
          }
        }
      }

      return token;
    },
  },
  //we cant remove this adapter
  adapter: PrismaAdapter(prisma as any),
  ...authConfig,
});
