import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
const isInProductionMode = process.env.NODE_ENV === 'production';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
        },
      },
      // Optional: You can use this to control the shape of the returned user
      // profile: (_profile) => ({
      //   id: _profile.sub,
      //   firstname: _profile.given_name,
      //   lastname: _profile.family_name,
      //   email: _profile.email,
      //   imageUrl: _profile.picture,
      // }),
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const user = { email: 'example@gmail.com', password: '123' };
        // const user = await getUserByEmail(credentials.email);
        return user ?? null;
      },
    }),
  ],
  // Add more options like callbacks, pages, etc. if needed
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
