// components/battle-card-display.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SwotAnalysis } from "@/components/swot-analysis";

interface BattleCardProps {
  data: any;
}

export function BattleCardDisplay({ data }: BattleCardProps) {
  // control each stage of the reveal
  const [showTop, setShowTop] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // reveal top cards immediately
    setShowTop(true);
    // reveal tabs header after 0.4s
    const t1 = setTimeout(() => setShowTabs(true), 400);
    // reveal all tab contents after 1.2s
    const t2 = setTimeout(() => setShowContent(true), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* ── Stage 1: Top cards ── */}
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <Card
          className={`flex-1 border-l-4 border-l-[#00A39E] h-auto
            transition-opacity duration-500
            ${showTop ? "opacity-100 animate-slide-in-right" : "opacity-0"}`}
        >
          <CardHeader className="bg-[#00A39E]/10 dark:bg-teal-900/30 py-3">
            <CardTitle className="text-xl text-[#00A39E] dark:text-teal-400">
              {data.employer}
            </CardTitle>
            <CardDescription>Your Solution</CardDescription>
          </CardHeader>
        </Card>

        <span
          className={`hidden md:flex items-center text-muted-foreground
            transition-opacity duration-500 delay-200
            ${showTop ? "opacity-100" : "opacity-0"}`}
        >
          vs
        </span>

        <Card
          className={`flex-1 border-l-4 border-l-[#333694] h-auto
            transition-opacity duration-500
            ${showTop ? "opacity-100 animate-slide-in-left" : "opacity-0"}`}
        >
          <CardHeader className="bg-[#333694]/10 dark:bg-indigo-950/30 py-3">
            <CardTitle className="text-xl text-[#333694] dark:text-indigo-400">
              {data.competitor}
            </CardTitle>
            <CardDescription>Competitor</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* ── Stage 2: Tabs header ── */}
      <Tabs
        defaultValue="swot"
        className={`w-full transition-opacity duration-500
          ${showTabs ? "opacity-100" : "opacity-0"}`}
      >
        <TabsList
          className={`grid w-full grid-cols-3 origin-left
            ${showTabs ? "animate-unfold" : ""}`}
        >
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          <TabsTrigger value="news">Latest News</TabsTrigger>
          <TabsTrigger value="strategy">Sales Strategy</TabsTrigger>
        </TabsList>

        {/* ── Stage 3: Tab contents ── */}
        <TabsContent value="swot" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`
                ${
                  showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"
                }`}
            >
              <SwotAnalysis
                data={data.employer_swot}
                title={data.employer}
                colorClass="green"
              />
            </div>
            <div
              className={`
                ${
                  showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"
                }`}
            >
              <SwotAnalysis
                data={data.competitor_swot}
                title={data.competitor}
                colorClass="purple"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="news" className="pt-4">
          <Card
            className={`
              ${showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"}`}
          >
            <CardHeader>
              <CardTitle>Latest News about {data.competitor}</CardTitle>
              <CardDescription>
                Stay updated with recent developments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                {data.competitor_latest_news?.summary ||
                  "No latest news available."}
              </p>
              {data.competitor_latest_news?.sources?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Sources:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.competitor_latest_news.sources.map(
                      (src: string, i: number) => (
                        <li key={i} className="text-sm">
                          <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:underline"
                          >
                            {src}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className={`
                ${
                  showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"
                }`}
            >
              <CardHeader className="bg-green-50 dark:bg-green-950/30">
                <CardTitle className="flex items-center text-green-700 dark:text-green-400">
                  Areas to Focus On
                </CardTitle>
                <CardDescription>
                  Key selling points against {data.competitor}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {data.areas_to_focus?.length ? (
                  <ul className="space-y-3">
                    {data.areas_to_focus.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 h-6 w-6 mr-2 text-sm">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No focus areas specified.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card
              className={`
                ${
                  showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"
                }`}
            >
              <CardHeader className="bg-red-50 dark:bg-red-950/30">
                <CardTitle className="flex items-center text-red-700 dark:text-red-400">
                  Tough Sell Points
                </CardTitle>
                <CardDescription>
                  Potential objections to address
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {data.tough_sell?.length ? (
                  <ul className="space-y-3">
                    {data.tough_sell.map((item: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 h-6 w-6 mr-2 text-sm">
                          !
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    No tough sell points specified.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {data.web_sources?.length > 0 && (
            <Card
              className={`mt-6
                ${
                  showContent ? "opacity-100 animate-slide-in-up" : "opacity-0"
                }`}
            >
              <CardHeader>
                <CardTitle className="text-base">Web Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.web_sources.map((src: string, i: number) => (
                    <li key={i} className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        {src}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
