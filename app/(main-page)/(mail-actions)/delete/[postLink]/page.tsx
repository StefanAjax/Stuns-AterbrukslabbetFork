import Link from "next/link";

import deletePostsByIds from "@/utils/delete-posts-by-ids";

import getSoonExpiringPost from "../../utils/get-soon-expiring-post";

interface DeletePostByMailPageProps {
  params: Promise<{
    postLink: string;
  }>;
}

export default async function DeletePostByMailPage({ params }: DeletePostByMailPageProps) {
  const { postLink } = await params;
  const soonExpiringPost = await getSoonExpiringPost({
    postLink: postLink,
  });
  if (!soonExpiringPost) {
    return (
      <div className="mx-auto flex h-[75vh] max-w-screen-sm flex-col justify-center gap-y-2 px-3 text-center">
        <h1 className="text-xl font-medium">Ingen annons hittades</h1>
        <p>
          Ojdå, något gick fel och ingen annons hittades. <br /> Säkerställ att annonsen inte redan förlängts eller tagits bort. <br /> Var god och kontakta oss om problemet kvarstår.
        </p>
        <Link className="pt-1 text-lg text-blue-600 hover:underline" href="/">
          Till startsidan
        </Link>
      </div>
    );
  }

  const response = await deletePostsByIds({
    postsIds: [soonExpiringPost.id],
    deletionReason: "Borttagen via mejl",
  });
  if (response && response.error) {
    console.error(response.error);
    return <div>..Ojdå, något gick fel</div>;
  }

  return (
    <div className="mx-auto flex h-[75vh] max-w-screen-sm flex-col justify-center gap-y-2 px-3 text-center">
      <h1 className="text-xl font-medium">Annons borttagen</h1>
      <p className="text-pretty">Din annons &quot;{soonExpiringPost.title}&quot; har tagits bort.</p>
      <Link className="pt-1 text-lg text-blue-600 hover:underline" href="/">
        Till startsidan
      </Link>
    </div>
  );
}
