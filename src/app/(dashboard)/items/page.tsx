"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function RequestsPage() {
  const allRequests = useQuery(api.functions.inboundRequests.list, {});

  if (allRequests === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">リクエスト一覧</h1>
        <p className="text-muted-foreground">
          フォームからの問い合わせを管理します
        </p>
      </div>

      {allRequests.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            まだリクエストはありません。
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {allRequests.map((request) => (
            <Card key={request._id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {request.businessName}
                  </CardTitle>
                  <Badge
                    variant={
                      request.status === "NEW" ? "default" : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">業種:</span>{" "}
                    {request.businessType}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      担当者:
                    </span>{" "}
                    {request.contactName}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      メール:
                    </span>{" "}
                    {request.email}
                  </div>
                  {request.phone && (
                    <div>
                      <span className="font-medium text-foreground">
                        電話:
                      </span>{" "}
                      {request.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
