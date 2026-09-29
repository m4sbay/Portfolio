# Project cover media

Keep using `project.image` for backward compatibility. Images (including existing GIFs) use Next Image. MP4 paths are detected centrally, case-insensitively, ignoring query strings and hashes.

```ts
image: {
  src: "/projects/example/cover.mp4",
  poster: "/projects/example/cover-poster.webp",
  alt: "Preview project Example",
  width: 2400,
  height: 1600,
}
```

Supply a static poster with the same aspect ratio and dimensions as the declared cover. MP4 covers without an image poster fail project loading with an actionable message. Use `ProjectMedia` in UI consumers and `getMediaPreview` for Open Graph/Twitter; never pass the MP4 to Next Image.

Video previews have no audio or controls and do not intercept card clicks. The poster is rendered on the server and stays visible until playback succeeds. Video source assignment waits for intersection with the viewport. Offscreen or hidden-tab videos pause; reduced motion prevents initial video loading and immediately restores the poster if enabled later. Playback rejection or media failure leaves the poster visible. All observers/listeners are cleaned up on unmount.

The intrinsic ratio reserves space for non-fill media; fill media requires the existing positioned, sized container. No new dependencies are needed.

Verification: `node --experimental-strip-types --test lib/project-media.test.mjs lib/project-video.test.mjs`, targeted ESLint, `npx tsc --noEmit`, and browser checks on `/work` and `/work/grs`.
