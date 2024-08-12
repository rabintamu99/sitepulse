// import { NextAuthConfig } from 'next-auth';
// import google from 'next-auth/providers/google';

// const authConfig: NextAuthConfig = {
//     session: {
//         strategy: 'database',
//     },
//     providers: [
//         google({
//             clientId: process.env.AUTH_GOOGLE_ID,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
// };

// export default authConfig;


import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		error: '/',
		signIn: '/',
		signOut: '/',
	},
	callbacks: {
		authorized({ auth }) {
			const isAuthenticated = !!auth?.user;

			return isAuthenticated;
		},
	},
	providers: [],
} satisfies NextAuthConfig;