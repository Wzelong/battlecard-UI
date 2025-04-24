"use client";

import React, { useState, useEffect } from "react";
import JSON5 from "json5";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  FileJson,
  RefreshCw,
  X,
  Moon,
  Sun,
  Loader,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BattleCardDisplay } from "@/components/battle-card-display";
import { sampleData } from "@/lib/sample-data";

export default function Home() {
  const [jsonData, setJsonData] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<"input" | "display">("input");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
    setError(null);
  };

  const parseJson = () => {
    setIsLoading(true);
    setError(null);
    setParsedData(null);
    const delay = Math.random() * 400 + 100; // random delay between 100ms and 500ms
    setTimeout(() => {
      try {
        if (!jsonData.trim()) {
          throw new Error("Please enter JSON data");
        }
        const data = JSON5.parse(jsonData);
        if (
          !data.employer ||
          !data.competitor ||
          !data.employer_swot ||
          !data.competitor_swot
        ) {
          throw new Error("JSON is missing required fields");
        }
        setParsedData(data);
        setTabValue("display");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON format");
      } finally {
        setIsLoading(false);
      }
    }, delay);
  };

  const loadSampleData = () => {
    setJsonData(JSON.stringify(sampleData, null, 2));
    setError(null);
  };

  const clearData = () => {
    setJsonData("");
    setParsedData(null);
    setError(null);
  };

  return (
    <main className="container mx-auto py-8 px-4 transition-colors duration-1000">
      <div className="flex items-center justify-center mb-6">
        <Image
          src="/icon.png"
          alt="App Icon"
          width={40}
          height={40}
          className="mr-0"
        />
        <h1 className="text-2xl font-bold text-center">
          SE Agentic‑AI Training 2025
        </h1>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-white" />
          ) : (
            <Moon className="h-4 w-4 text-black" />
          )}
        </button>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="display" disabled={!parsedData}>
            View Battle Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Enter Battle Card JSON</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadSampleData}>
                <FileJson className="mr-2 h-4 w-4" />
                Load Sample
              </Button>
            </div>
          </div>

          <Textarea
            placeholder="Paste Battle Card JSON here..."
            className="min-h-[500px] text-sm"
            value={jsonData}
            onChange={handleJsonChange}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={clearData}>
              <X className="mr-0 h-4 w-4" />
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={parseJson}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="mr-0 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-0 h-4 w-4" />
              )}
              Generate BattleCard
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="display">
          {parsedData && <BattleCardDisplay data={parsedData} />}
        </TabsContent>
      </Tabs>
    </main>
  );
}
