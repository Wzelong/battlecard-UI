import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SwotAnalysisProps {
  data: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    sources?: string[];
  };
  title: string;
  colorClass: "green" | "purple";
}

export function SwotAnalysis({ data, title, colorClass }: SwotAnalysisProps) {
  const colorMap = {
    green: {
      bg: "bg-[#00A39E]/10 dark:bg-teal-900/30",
      text: "text-[#00A39E] dark:text-teal-400",
      border: "border-[#00A39E]/30 dark:border-[#00A39E]/60",
      strengthBg: "bg-blue-100 dark:bg-blue-900/30",
      strengthText: "text-blue-800 dark:text-blue-300",
      weaknessBg: "bg-red-100 dark:bg-red-900/30",
      weaknessText: "text-red-800 dark:text-red-300",
      opportunityBg: "bg-green-100 dark:bg-green-900/30",
      opportunityText: "text-green-800 dark:text-green-300",
      threatBg: "bg-amber-100 dark:bg-amber-900/30",
      threatText: "text-amber-800 dark:text-amber-300",
    },
    purple: {
      bg: "bg-[#333694]/10 dark:bg-indigo-950/30",
      text: "text-[#333694] dark:text-indigo-400",
      border: "border-[#333694]/30 dark:border-[#333694]/60",
      strengthBg: "bg-blue-100 dark:bg-blue-900/30",
      strengthText: "text-blue-800 dark:text-blue-300",
      weaknessBg: "bg-red-100 dark:bg-red-900/30",
      weaknessText: "text-red-800 dark:text-red-300",
      opportunityBg: "bg-green-100 dark:bg-green-900/30",
      opportunityText: "text-green-800 dark:text-green-300",
      threatBg: "bg-amber-100 dark:bg-amber-900/30",
      threatText: "text-amber-800 dark:text-amber-300",
    },
  };

  const colors = colorMap[colorClass];

  return (
    <Card>
      <CardHeader className={colors.bg}>
        <CardTitle className={colors.text}>{title} SWOT Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-dashed">
          <div
            className={`${colors.border} p-4 border-b sm:border-b-0 sm:border-r`}
          >
            <h3 className={`text-sm font-semibold mb-2 ${colors.strengthText}`}>
              Strengths
            </h3>
            <ul className="space-y-2">
              {data.strengths.map((strength, i) => (
                <li key={i} className="flex items-start text-sm">
                  <span
                    className={`inline-flex items-center justify-center rounded-full ${colors.strengthBg} ${colors.strengthText} h-5 w-5 mr-2 flex-shrink-0 text-xs`}
                  >
                    S
                  </span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h3 className={`text-sm font-semibold mb-2 ${colors.weaknessText}`}>
              Weaknesses
            </h3>
            <ul className="space-y-2">
              {data.weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start text-sm">
                  <span
                    className={`inline-flex items-center justify-center rounded-full ${colors.weaknessBg} ${colors.weaknessText} h-5 w-5 mr-2 flex-shrink-0 text-xs`}
                  >
                    W
                  </span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Opportunities & Threats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-dashed">
          <div
            className={`${colors.border} p-4 border-b sm:border-b-0 sm:border-r`}
          >
            <h3
              className={`text-sm font-semibold mb-2 ${colors.opportunityText}`}
            >
              Opportunities
            </h3>
            <ul className="space-y-2">
              {data.opportunities.map((opp, i) => (
                <li key={i} className="flex items-start text-sm">
                  <span
                    className={`inline-flex items-center justify-center rounded-full ${colors.opportunityBg} ${colors.opportunityText} h-5 w-5 mr-2 flex-shrink-0 text-xs`}
                  >
                    O
                  </span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h3 className={`text-sm font-semibold mb-2 ${colors.threatText}`}>
              Threats
            </h3>
            <ul className="space-y-2">
              {data.threats.map((threat, i) => (
                <li key={i} className="flex items-start text-sm">
                  <span
                    className={`inline-flex items-center justify-center rounded-full ${colors.threatBg} ${colors.threatText} h-5 w-5 mr-2 flex-shrink-0 text-xs`}
                  >
                    T
                  </span>
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sources */}
        {data.sources && data.sources.length > 0 && (
          <div className="p-4 border-t border-dashed">
            <h3 className="text-xs font-semibold text-muted-foreground mb-1">
              Sources:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {data.sources.map((src: string, i: number) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {src}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
