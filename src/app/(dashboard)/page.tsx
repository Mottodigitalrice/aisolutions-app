"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox, Users, Globe, CheckCircle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();

  // Get inbound requests
  const allRequests = useQuery(api.functions.inboundRequests.list, {});
  const newRequests = useQuery(api.functions.inboundRequests.list, {
    status: "NEW",
  });

  // Get leads
  const allLeads = useQuery(api.functions.leads.list, {});

  const totalRequests = allRequests?.length ?? 0;
  const newCount = newRequests?.length ?? 0;
  const totalLeads = allLeads?.length ?? 0;
  const convertedLeads =
    allLeads?.filter((l) => l.status === "CONVERTED").length ?? 0;

  const isLoading =
    allRequests === undefined ||
    newRequests === undefined ||
    allLeads === undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          ダッシュボード
        </h1>
        <p className="text-muted-foreground">
          {user?.firstName
            ? `おかえりなさい、${user.firstName}さん`
            : "おかえりなさい"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              新規リクエスト
            </CardTitle>
            <Inbox className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">{newCount}</div>
                <p className="text-xs text-muted-foreground">未対応</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              総リクエスト
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totalRequests}</div>
                <p className="text-xs text-muted-foreground">
                  フォームからの問い合わせ
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              リード数
            </CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">{totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  クローラーからの取得
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              成約
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <>
                <div className="text-2xl font-bold">{convertedLeads}</div>
                <p className="text-xs text-muted-foreground">
                  コンバージョン
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Solutions 管理画面</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            リクエストの管理、リードの確認、デモサイトの管理はこちらから行えます。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
