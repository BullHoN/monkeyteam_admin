import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: '' },
				password: { label: 'password', type: 'password', placeholder: '' },
			},
			async authorize(credentials: any) {
				const auth_url: string = process.env.AUTH_VERIFY_URL
					? process.env.AUTH_VERIFY_URL
					: '';

				try {
					const res = await fetch(auth_url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					});

					const data = await res.json();

					if (data.status) {
						return {
							id: 'user1',
							email: 'admin',
						};
					} else {
						return null;
					}
				} catch (error) {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
