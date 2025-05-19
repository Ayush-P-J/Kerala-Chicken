"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateCredentials } from "@/components/forms/credentials/CreateCredentials";
export default function Layout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Credentials</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <CreateCredentials />
      </CardContent>
    </Card>
  );
}
