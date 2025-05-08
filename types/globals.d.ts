export type Roles = "admin" | "moderator" | "medlem";
export type PostType = undefined | "Erbjuds" | "Efterfrågas";
export type PostCategory = undefined | "förbrukningsvara" | "instrument/maskin" | "inventarie";
export type SortOrder = undefined | "asc" | "desc";
export type ExtendedFile = {
  name: string;
  visible: boolean;
  file?: File;
  url?: string;
  createdAt?: Date;
  id?: number;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
