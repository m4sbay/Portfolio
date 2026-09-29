import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(fs.readFileSync(new URL("../components/projects/ProjectVideo.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount({ reduced = false, rejected = false } = {}) {
  let effect, intersection, playing = false, plays = 0, pauses = 0, disconnected = false;
  const listeners = new Map();
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.set("motion", fn), removeEventListener: () => listeners.delete("motion") };
  const doc = { hidden: false, addEventListener: (_, fn) => listeners.set("visibility", fn), removeEventListener: () => listeners.delete("visibility") };
  const video = {
    src: "", muted: false,
    getAttribute: () => video.src || null,
    play: () => { plays++; return rejected ? Promise.reject(new Error("autoplay blocked")) : Promise.resolve(); },
    pause: () => { pauses++; },
    addEventListener: (_, fn) => listeners.set("error", fn), removeEventListener: () => listeners.delete("error"),
    removeAttribute: () => { video.src = ""; }, load: () => {},
  };
  let refIndex = 0;
  const exports = {};
  vm.runInNewContext(source, {
    exports, window: { matchMedia: () => preference }, document: doc,
    IntersectionObserver: class { constructor(fn) { intersection = fn; } observe() {} disconnect() { disconnected = true; } },
    require: name => {
      if (name === "react") return { useRef: () => ({ current: refIndex++ ? video : {} }), useState: () => [false, value => { playing = value; }], useEffect: fn => { effect = fn; } };
      if (name === "react/jsx-runtime") return { jsx: () => null, jsxs: () => null };
      if (name === "next/image") return { default: () => null };
      if (name === "@/lib/project-media") return { getMediaPreview: m => m.poster };
      throw new Error(name);
    },
  });
  exports.ProjectVideo({ media: {src:"/cover.mp4",poster:"/poster.jpg",width:300,height:200,alt:"Cover"} });
  const cleanup = effect();
  return { video, preference, doc, listeners, cleanup, enter: () => intersection([{isIntersecting:true,intersectionRatio:1}]), leave: () => intersection([{isIntersecting:false,intersectionRatio:0}]), state: () => ({playing,plays,pauses,disconnected}) };
}

test("loads only on intersection and pauses when leaving", async () => {
  const m = mount(); assert.equal(m.video.src, "");
  m.enter(); await Promise.resolve(); assert.equal(m.video.src,"/cover.mp4"); assert.equal(m.state().playing,true); assert.equal(m.video.muted,true);
  m.leave(); assert.equal(m.state().playing,false); m.cleanup(); assert.equal(m.state().disconnected,true); assert.equal(m.listeners.size,0);
});
test("reduced motion prevents loading and responds to preference changes", async () => {
  const m=mount({reduced:true}); m.enter(); assert.equal(m.video.src,""); assert.equal(m.state().plays,0);
  m.preference.matches=false; m.listeners.get("motion")(); await Promise.resolve(); assert.equal(m.state().playing,true);
  m.preference.matches=true; m.listeners.get("motion")(); assert.equal(m.state().playing,false); m.cleanup();
});
test("blocked autoplay and media errors preserve poster state", async () => {
  const m=mount({rejected:true}); m.enter(); await Promise.resolve(); await Promise.resolve(); assert.equal(m.state().playing,false);
  m.listeners.get("error")(); const count=m.state().plays; m.enter(); assert.equal(m.state().plays,count); m.cleanup();
});
test("hidden tabs pause playback and stale play promises cannot reveal video", async () => {
  const m=mount(); m.enter(); m.doc.hidden=true; m.listeners.get("visibility")(); await Promise.resolve(); assert.equal(m.state().playing,false); m.cleanup();
});
