"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resolveReport } from "../_actions/resolve-report";
import { Button } from "@/components/ui/button";

interface ResolveReportButtonProps {
  reportId: number;
}

export function ResolveReportButton({ reportId }: ResolveReportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResolve = async () => {
    try {
      setIsLoading(true);
      await resolveReport(reportId);
      toast.success("Rapporten har markerats som löst");
      router.refresh();
    } catch (error) {
      toast.error("Något gick fel. Försök igen senare.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={"default"} size={"sm"} onClick={handleResolve}>
      {isLoading ? "Bearbetar..." : "Markera som löst"}
    </Button>
  );
}
