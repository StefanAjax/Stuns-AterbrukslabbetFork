"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Post } from "@prisma/client";

import PostComponent from "../../post/_components/post-component";

interface PostPreviewForMobileProps {
  postData: Post;
  email: string;
  fullName: string;
}

export default function PostPreviewForMobile({ postData, email, fullName }: PostPreviewForMobileProps) {
  return (
    <Dialog>
      <DialogTrigger className="block whitespace-nowrap rounded-sm bg-primary px-3 text-sm md:hidden md:px-4 md:text-base">Se annons</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Förhandsvisning</DialogTitle>
          <DialogDescription className="text-start text-black">
            <PostComponent postData={postData} email={email} fullName={fullName} isPreview={true} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
