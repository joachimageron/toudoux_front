export type Categories = {
  "@context": string;
  "@id": string;
  "@type": string;
  member: Category[];
  totalItems: number;
};

export type Category = {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};