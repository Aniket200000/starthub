declare module "next-auth" {
    interface Session {
        id: string;
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
    }
}
