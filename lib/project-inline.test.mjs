import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { renderProjectInline } from "./project-inline.ts";

const render = (text, links) => renderToStaticMarkup(createElement("p", null, renderProjectInline(text, links)));

test("renders technical values as inline code inside a paragraph", () => {
  assert.equal(render("Gunakan `PROJECT_CONTEXT.md` lalu `npm run dev`."), "<p>Gunakan <code>PROJECT_CONTEXT.md</code> lalu <code>npm run dev</code>.</p>");
});
test("keeps unmatched delimiters and ordinary content readable", () => {
  assert.equal(render("Teks biasa dan `belum selesai"), "<p>Teks biasa dan `belum selesai</p>");
});
test("code is literal escaped text, never HTML or a brand link", () => {
  const html = render("`<script> **Bash**`", [{ label: "Bash", href: "https://example.com" }]);
  assert.equal(html, "<p><code>&lt;script&gt; **Bash**</code></p>");
});
test("preserves existing brand links outside code and emphasis compatibility", () => {
  const html = render("**Bash** dan `Bash`", [{ label: "Bash", href: "https://example.com" }]);
  assert.equal((html.match(/<a /g) ?? []).length, 1);
  assert.ok(html.includes("<code>Bash</code>"));
  assert.ok(!html.includes("**"));
});
test("supports inline code within existing emphasis", () => {
  assert.equal(render("**Gunakan `next/image` sekarang**"), "<p>Gunakan <code>next/image</code> sekarang</p>");
});
