import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">
          ページが見つかりません
        </h1>
        <p className="mt-2 text-muted-foreground">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <Link href="/">
          <Button className="mt-6">トップページに戻る</Button>
        </Link>
      </div>
    </div>
  );
}
