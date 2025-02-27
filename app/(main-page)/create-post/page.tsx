import Link from "next/link";

import getNameAndEmailFromUserId from "@/utils/get-name-and-email-from-user-id";
import { getUserId } from "@/utils/get-user-id";

import CreatePostComponent from "./_components/create-post-component";

export default async function createPostPage() {
  const userId = await getUserId();

  if (userId) {
    const { firstName, lastName, email } = await getNameAndEmailFromUserId({
      userId,
    });

    return (
      <div>
        <CreatePostComponent firstName={firstName} lastName={lastName} email={email} userId={userId} />
      </div>
    );
  } else {
    return (
      <div className="mx-auto flex h-[75vh] max-w-screen-sm flex-col justify-center gap-y-2 px-3 text-center">
        <h1 className="text-xl font-medium">Ogiltig användarinformation</h1>
        <p>
          Ojdå, något gick fel och din användarinformation hittades inte. <br />
          Var god och kontakta oss om problemet kvarstår.
        </p>
        <Link className="pt-1 text-lg text-blue-600 hover:underline" href="/">
          Till startsidan
        </Link>
      </div>
    );
  }
}
