export type Project = {
  title: string;
  description: string;
  longDescription: string;
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

