import React from "react";

interface DeveloperProfileProps {
  name: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  bio?: string;
}

export default function DeveloperProfile({ name, linkedInUrl, githubUrl, portfolioUrl, bio }: DeveloperProfileProps) {
  return (
    <div>
      <span className="font-semibold">{name}</span>
      {linkedInUrl && (
        <>
          {" "}
          <a className="text-blue-600 hover:underline" href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </>
      )}
      {githubUrl && (
        <>
          {linkedInUrl ? ", " : " "}
          <a className="text-blue-600 hover:underline" href={githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </>
      )}
      {portfolioUrl && (
        <>
          {linkedInUrl || githubUrl ? ", " : " "}
          <a className="text-blue-600 hover:underline" href={portfolioUrl} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </>
      )}
      {bio && <p className="mt-1 text-gray-600">{bio}</p>}
    </div>
  );
}
