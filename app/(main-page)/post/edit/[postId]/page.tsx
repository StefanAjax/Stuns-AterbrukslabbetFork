import Link from "next/link";

import getNameAndEmailFromUserId from "@/utils/get-name-and-email-from-user-id";
import { getUserId } from "@/utils/get-user-id";

import CreatePostComponent from "../../../create-post/_components/create-post-component";

import { db } from "@/lib/db";

interface PostIdPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function createPostPage({ params }: PostIdPageProps) {
  const { postId } = await params;

  const userId = await getUserId();

  const postUser = await db.post.findUnique({
    where: {
      id: parseInt(postId),
    },
    select: {
      userId: true,
    },
  });

  if (!postUser || postUser.userId !== userId) {
    return (
      <div className="mx-auto flex h-[75vh] max-w-screen-sm flex-col justify-center gap-y-2 px-3 text-center">
        <h1 className="text-xl font-medium">Oj då, du har inte rättigheter att redigera denna annons</h1>
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

  if (!userId) {
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

  // Get post data from the database

  const postData = await db.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });

  if (!postData) {
    return (
      <div className="mx-auto flex h-[75vh] max-w-screen-sm flex-col justify-center gap-y-2 px-3 text-center">
        <h1 className="text-xl font-medium">Oj då, ingen annons hittades...</h1>
        <p className="text-pretty">
          Denna annons verkar inte finnas. Om du tror att annonsen bör finnas kontrollera då URL:en. Om du precis skapat annonsen kan det ta en liten stund för den att dyka upp.
        </p>
        <Link className="pt-1 text-lg text-blue-600 hover:underline" href="/">
          Till startsidan
        </Link>
      </div>
    );
  }

  const { firstName, lastName, email } = await getNameAndEmailFromUserId({
    userId,
  });

  return (
    <div>
      <CreatePostComponent
        firstName={firstName}
        lastName={lastName}
        email={email}
        userId={userId}
        title={postData.title}
        description={postData.description || undefined}
        postType={postData.postType}
        category={postData.category}
        municipality={postData.location}
        date={postData.expiresAt}
        customExpirationDate={postData.hasCustomExpirationDate}
        update={true}
      />
    </div>
  );
}
