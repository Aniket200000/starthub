// next-auth.d.ts
import "next-auth";
import "next-auth/jwt";
import "next-auth/providers/github"; // ✅ Ensure GitHub module is recognized


declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

declare module "next-auth/providers/github" {
    interface GitHubProfile {
      login: string;
      id: number;
      bio?: string;
      avatar_url: string;
    }
  }