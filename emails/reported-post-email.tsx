"use server";

import React from "react";

import { Section, Text, Link } from "@react-email/components";

import EmailTemplate from "./components/email-template";

import type { Post } from "@prisma/client";

interface ReportedPostEmailProps {
  comment?: string;
  post: Post;
  userId: string;
}

export default async function ReportedPostEmail({ comment, post, userId }: ReportedPostEmailProps) {
  return (
    <EmailTemplate
      preview="En annons har blivit rapporterad"
      header={`En annons har blivit rapporterad`}
      main={
        <>
          <Text>En annons med titeln "{post.title}" har blivit rapporterad av en användare. Granska annonsen och vidta eventuella åtgärder.</Text>
          {comment && (
            <Section>
              <Text className="font-semibold">Kommentar från användare</Text>
              <Text>{comment}</Text>
            </Section>
          )}
          <Section>
            <Link className="font-semibold" href={`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.id}`}>
              Länk till annonsen som har rapporterats
            </Link>
          </Section>
          <Section>
            <Link className="font-semibold" href={`${process.env.NEXT_PUBLIC_SITE_URL}/profile/${userId}`}>
              Länk till användaren som rapporterade annonsen
            </Link>
          </Section>
        </>
      }
    />
  );
}
