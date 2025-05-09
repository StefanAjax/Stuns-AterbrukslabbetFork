"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
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
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex w-full md:hidden">
          <Eye className="mr-2 size-4" />
          Förhandsgranska
        </Button>
      </DialogTrigger>
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
