"use client";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import getArchivedPosts from "../_utils/get-archived-posts";

import type { StandardResponse } from "@/types/globals";

const onExport = async (): StandardResponse => {
  const archivedPosts = await getArchivedPosts();

  if (!archivedPosts) {
    return {
      error: {
        code: 500,
        message: "Inga arkiverade annonser hittades",
      },
    };
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Arkiverade annonser");

  worksheet.columns = [
    { header: "Id", key: "id", width: 10 },
    { header: "Anledning", key: "deletionReason", width: 20 },
    { header: "Arkiveringsdatum", key: "archivedAt", width: 24 },
    { header: "Skapad", key: "createdAt", width: 24 },
    { header: "Plats", key: "location", width: 28 },
    { header: "Titel", key: "title", width: 32 },
    { header: "Beskrivning", key: "description", width: 32 },
    { header: "Annonstyp", key: "postType", width: 20 },
    { header: "Kategori", key: "category", width: 24 },
    { header: "Angett slutdatum", key: "hasCustomExpirationDate", width: 16 },
  ];

  if (Array.isArray(archivedPosts)) {
    archivedPosts.forEach((archivedPost) => {
      worksheet.addRow(archivedPost);
    });
  } else {
    return {
      error: {
        code: 500,
        message: "Något gick fel",
      },
    };
  }
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `AterbrukslabbetArkiveradeInlagg.xlsx`);
  });

  return {
    success: {
      code: 200,
      message: "Arkiverade annonser exporterade",
    },
  };
};

export default function ExportArchivesButton() {
  return (
    <Button
      variant="default"
      onClick={async () => {
        const result = onExport();
        toast.promise(
          result.then((res) => {
            if (res.error) {
              return Promise.reject(res.error);
            }
            if (res.success) {
              return Promise.resolve(res.success);
            }
            return Promise.reject({
              code: 500,
              message: "Något gick fel",
            });
          }),
          {
            loading: "Exporterar arkiverade annonser...",
            success: (res) => res.message,
            error: (res) => `Felkod ${res.code}: ${res.message}`,
          },
        );
      }}
    >
      Exportera
    </Button>
  );
}
