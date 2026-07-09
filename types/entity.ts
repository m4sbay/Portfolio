/** Entitas eksternal yang bisa dirujuk artikel: aplikasi, tempat, organisasi, dll. */
export interface Entity {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** URL resmi; dibuka di tab baru oleh RichMention & EntityCard */
  website: string;
  /** Path logo kecil di /public */
  logo: string;
  /** Path gambar preview di /public untuk EntityCard */
  preview: string;
}
