import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import LoginPage from "~/components/authComps/LoginPage/LoginPage";
import Landing from "~/components/landing/Landing";
import SlashRouter from "~/components/slashRouter/SlashRouter";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <SlashRouter />
    </HydrateClient>
  );
}
