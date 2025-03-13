import React from "react";

import { Section, Text, Link } from "@react-email/components";

import EmailTemplate from "./components/email-template";

interface ReportedPostEmailProps {
  comment?: string;
  title: string;
  post: string;
  user: string;
}

export default function ReportedPostEmail({ comment, title, post }: ReportedPostEmailProps) {
  return (
    <EmailTemplate
      preview="En annons har blivit rapporterad"
      header={`En annons har blivit rapporterad`}
      main={
        <>
          <Text>En annons med titeln "{title}" har blivit rapporterad av en användare. Granska annonsen och vidta eventuella åtgärder.</Text>
          {comment && (
            <Section>
              <Text className="font-semibold">Kommentar från användare</Text>
              <Text>{comment}</Text>
            </Section>
          )}
          <Section>
            <Text className="font-semibold">Annons</Text>
            <Link></Link>
          </Section>
          <Section>
            <Text className="font-semibold">Användare</Text>
            <Link></Link>
          </Section>
        </>
      }
    />
  );
}
