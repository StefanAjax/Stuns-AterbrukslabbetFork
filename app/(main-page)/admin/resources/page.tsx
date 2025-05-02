"use server";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkRole } from "@/utils/check-role";
import { redirect } from "next/navigation";
import useDragOver from "@/app/(main-page)/utils/drag-over";
import validateFiles from "@/utils/validate-files";

import { db } from "@/lib/db";

import type { Resources } from "@prisma/client";

export default async function Page() {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  const resources = await db.resources.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // const [isDraggingOver, setIsDraggingOver] = useDragOver();

  // const validateFiles = useCallback(
  //   async (files: FileList) => {
  //     const fileArray = Array.from(files);
  //     const validFiles: File[] = [];

  //     for (const file of fileArray) {
  //       if (file.size > 10 * 1024 * 1024) {
  //         toast.error(`Filen ${file.name} är för stor. Maximal storlek är 10 MB.`);
  //         continue;
  //       }

  //       if (!file.type.startsWith("application/pdf")) {
  //         toast.error(`Filen ${file.name} är inte en giltig PDF.`);
  //         continue;
  //       }

  //       validFiles.push(file);
  //     }

  //     if (validFiles.length === 1) {
  //       toast.success("1 fil har validerats och är redo att laddas upp.");
  //     } else if (validFiles.length > 1) {
  //       toast.success(`${validFiles.length} filer har validerats och är redo att laddas upp.`);
  //     } else {
  //       toast.error("Inga giltiga filer hittades.");
  //       return;
  //     }

  //     // TODO: Handle the upload of valid files
  //   },
  //   [setIsDraggingOver],
  // );

  return (
    <>
      {isDraggingOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Släpp filerna här för att ladda upp</p>
        </div>
      )}
      <div className="mx-auto mt-10 max-w-screen-md p-4">
        <h1 className="mb-6 text-center text-2xl font-semibold">Resurser</h1>
        <p className="mb-4 text-center text-lg font-medium">Här kan du ladda upp och hantera resurser för användare.</p>
      </div>
      <div className="mx-auto mt-10 max-w-screen-md p-4">
        <h2 className="mb-4 text-xl font-semibold">Ladda upp nya resurser</h2>
        <p className="mb-4 text-lg font-medium">Dra och släpp PDF-filer här eller klicka för att välja filer.</p>
        <Input
          id="file-upload"
          className="hidden"
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              validateFiles(e.target.files);
            }
          }}
        />
        <p className="mt-2 text-sm text-gray-500">Maximal filstorlek: 10 MB. Endast PDF-filer är tillåtna.</p>
        <Button
          className={`mt-4 h-32 rounded-lg border-2 border-dashed ${isDraggingOver ? "border-blue-500" : "border-gray-300"} flex items-center justify-center`}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <p className="text-lg font-medium text-gray-500">Dra och släpp filer här</p>
        </Button>
        <p className="mt-2 text-sm text-gray-500">Eller klicka för att välja filer.</p>
      </div>
      <div className="mx-auto mt-10 max-w-screen-md p-4">
        {/* Handle existing resources */}

        {/* View, delete, and toggle visibility of resources */}
      </div>
    </>
  );
}
