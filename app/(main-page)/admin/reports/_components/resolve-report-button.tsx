"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resolveReport } from "../_actions/resolve-report";
import { Button } from "@/components/ui/button";
import type { StandardResponse } from "@/types/globals";

interface ResolveReportButtonProps {
  reportId: number;
}

export function ResolveReportButton({ reportId }: ResolveReportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResolve = async (): StandardResponse => {
    try {
      setIsLoading(true);
      await resolveReport(reportId);
      router.refresh();
      return {
        success: {
          code: 200,
          message: "Annonser markerad som löst",
        },
      };
    } catch (error) {
      return {
        error: {
          code: 500,
          message: "Något gick fel",
        },
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={"default"}
      size={"sm"}
      onClick={async () => {
        const result = handleResolve();
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
            loading: "Bearbetar...",
            success: (res) => res.message,
            error: (res) => `Felkod ${res.code}: ${res.message}`,
          },
        );
      }}
    >
      {isLoading ? "Bearbetar..." : "Markera som löst"}
    </Button>
  );
}
