import NextAuth from "next-auth";
import GitHub, { GitHubProfile } from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import type { Author } from "@/sanity/types"; // Ensure you have proper types for your Sanity schema

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const githubProfile = profile as unknown as GitHubProfile; // ✅ Use the declared type
        const githubId = githubProfile.id.toString();

        if (!user.email || !user.name) {
          throw new Error("Missing required user information");
        }

        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch<Author | null>(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: githubId,
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: githubId,
            name: user.name,
            username: githubProfile.login,
            email: user.email,
            image: user.image ?? "",
            bio: githubProfile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async jwt({ token, profile }) {
      try {
        if (profile) {
          const githubProfile = profile as unknown as GitHubProfile; // ✅ Use the declared type
          const githubId = githubProfile.id.toString();

          const user = await client
            .withConfig({ useCdn: false })
            .fetch<Author | null>(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: githubId,
            });

          if (user) {
            token.id = user._id;
          }
        }
      } catch (error) {
        console.error("JWT error:", error);
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});
