import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
