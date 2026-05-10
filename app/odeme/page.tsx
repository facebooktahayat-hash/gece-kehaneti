import { redirect } from "next/navigation";
import { getPackage } from "@/lib/data";

export default function PaymentPage({ searchParams }: { searchParams?: { paket?: string } }) {
  const item = getPackage(searchParams?.paket || "kehanet") || getPackage("kehanet");

  if (!item) {
    redirect("/");
  }

  redirect(`/siparis/${item.slug}`);
}
