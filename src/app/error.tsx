"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold">
          エラーが発生しました
        </h1>
        <p className="mt-2 text-muted-foreground">
          予期しないエラーが発生しました。もう一度お試しください。
        </p>
        <Button onClick={reset} className="mt-6">
          再試行
        </Button>
      </div>
    </div>
  );
}
