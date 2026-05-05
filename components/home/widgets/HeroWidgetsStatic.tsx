"use client";

import type { Project } from "@/types/project";
import { site } from "@/lib/site";
import { IntroWidget } from "@/components/home/widgets/IntroWidget";
import { StackWidget } from "@/components/home/widgets/StackWidget";
import { NowWidget } from "@/components/home/widgets/LastProjectWidget";
import { PhotoWidget } from "@/components/home/widgets/PhotoWidget";
import { SpotifyWidget } from "@/components/home/widgets/SpotifyWidget";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">{children}</div>;
}

export function HeroWidgetsStatic({ projects }: { projects: Project[] }) {
  const nowProject = site.nowProjectTitle ?? projects[0]?.title ?? "Project baru";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <IntroWidget />
      </Card>
      <Card>
        <StackWidget />
      </Card>
      <Card>
        <NowWidget projectTitle={nowProject} />
      </Card>
      <Card>
        <PhotoWidget />
      </Card>
      {site.showSpotifyWidget ? (
        <div className="sm:col-span-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <SpotifyWidget />
          </div>
        </div>
      ) : null}
    </div>
  );
}
