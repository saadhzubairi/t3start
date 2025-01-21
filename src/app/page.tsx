
import SlashRouter from "~/components/slashRouter/SlashRouter";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <SlashRouter session={session} />
    </HydrateClient>
  );
}
