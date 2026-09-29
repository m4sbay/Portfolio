import assert from "node:assert/strict";
import { test } from "node:test";
import { getMediaType, getMediaPreview } from "./project-media.ts";

test("detects MP4 paths including uppercase, query and fragment", () => {
  for (const src of ["/cover.mp4", "/COVER.MP4?v=2#start", "https://example.com/a.mp4#t=1"]) assert.equal(getMediaType(src), "video");
  for (const src of ["/a.gif", "/a.webp", "/a.jpg?name=a.mp4", "/a.svg"]) assert.equal(getMediaType(src), "image");
});
test("share preview uses poster for video and never returns an MP4", () => {
  assert.equal(getMediaPreview({src:"/a.mp4",poster:"/a.webp"}), "/a.webp");
  assert.equal(getMediaPreview({src:"/a.jpg"}), "/a.jpg");
  assert.equal(getMediaPreview({src:"/a.mp4"}), undefined);
  assert.equal(getMediaPreview({src:"/a.mp4",poster:"/b.mp4"}), undefined);
});
