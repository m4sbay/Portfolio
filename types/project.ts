export type ProjectCategory = "All" | "Design" | "Website" | "Tools" | "Video" | "App";

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  slug: string;
  href?: string;
  logo?: string;
  caseStudyHref?: string;
  externalLink?: string;
  externalLinkLabel?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  hoverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  gallery?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  caseStudy?: {
    title: string;
    description: string;
    gallery: {
      src: string;
      alt: string;
      width: number;
      height: number;
    }[];
  };
};

