import assert from "node:assert/strict";
import { test } from "node:test";
import { getRecommendedProjects } from "./project-recommendations.ts";

const projects = Array.from({ length: 12 }, (_, index) => ({
  slug: `project-${index}`,
  title: `Project ${index}`,
}));
const slugs = (items) => items.map(({ slug }) => slug);

test("stable across repeats and input ordering, without mutating the pool", () => {
  const pool = Object.freeze([...projects]);
  const expected = getRecommendedProjects(projects[0], pool);
  assert.deepEqual(getRecommendedProjects(projects[0], pool), expected);
  assert.deepEqual(getRecommendedProjects(projects[0], [...pool].reverse()), expected);
  assert.deepEqual(pool, projects);
});

test("excludes the current slug and deduplicates candidate slugs", () => {
  const result = getRecommendedProjects({ ...projects[0] }, [
    projects[0], projects[1], { ...projects[1] }, projects[2], projects[0],
  ]);
  assert.deepEqual(new Set(slugs(result)), new Set(["project-1", "project-2"]));
  assert.equal(result.length, 2);
});

test("handles empty pools and one through six total projects", () => {
  assert.deepEqual(getRecommendedProjects(projects[0], []), []);
  for (let total = 1; total <= 6; total++) {
    assert.equal(getRecommendedProjects(projects[0], projects.slice(0, total)).length, Math.min(total - 1, 4));
  }
});

test("respects smaller limits and never returns more than four", () => {
  for (const [limit, count] of [[0, 0], [-1, 0], [2, 2], [2.9, 2], [10, 4], [NaN, 0]]) {
    assert.equal(getRecommendedProjects(projects[0], projects, limit).length, count);
  }
});

test("current slug seeds the ranking of an identical candidate pool", () => {
  const first = slugs(getRecommendedProjects({ slug: "current-a" }, projects));
  const second = slugs(getRecommendedProjects({ slug: "current-b" }, projects));
  assert.notDeepEqual(first, second);
  assert.notDeepEqual([...first].sort(), [...second].sort());
});

test("new candidates join automatically", () => {
  const pool = projects.slice(0, 3);
  assert.ok(getRecommendedProjects(projects[0], [...pool, projects[3]])
    .some(({ slug }) => slug === projects[3].slug));
});
