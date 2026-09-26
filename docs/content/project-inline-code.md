# Inline code dalam deskripsi project

Deskripsi panjang (`longDescription`), deskripsi process section/case study, dan `visualPreviewClosing` mendukung inline code dengan satu pasang backtick. Konten tetap string TypeScript; ini bukan parser Markdown/MDX lengkap.

Untuk string dengan tanda kutip biasa:

```ts
longDescription: "Gunakan `PROJECT_CONTEXT.md` lalu jalankan `npm run dev`.",
```

Untuk template literal multiline, escape backtick agar tidak menutup string TypeScript:

```ts
longDescription: `Gunakan \`PROJECT_CONTEXT.md\`.

Komponen ada di \`src/features/projects/components/project-description.tsx\`.`,
```

Renderer `renderProjectInline` menghasilkan elemen React `<code>` tanpa HTML manual. Isi code diperlakukan sebagai teks literal, bukan markup atau tautan brand. Backtick yang tidak berpasangan tetap teks biasa. Heading section `**Judul**` dan tautan brand existing tetap didukung.

Gaya shared `.reading` memakai Geist Mono, ukuran 0.9em, zinc, background transparan, padding kecil, dan radius kecil. Inline code boleh wrap termasuk string panjang; elemen tetap inline dan mewarisi line-height. Gaya ini berlaku juga pada code dalam list dan blockquote, tetapi mengecualikan code di dalam pre serta subtree `.not-reading`.

Verifikasi: `node --test lib/project-inline.test.mjs`, targeted ESLint, dan `npx tsc --noEmit`. Browser Download Organizer diperiksa pada 390 px dan 1440 px tanpa overflow horizontal.
