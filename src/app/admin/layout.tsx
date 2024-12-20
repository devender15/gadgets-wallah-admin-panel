import { createClient } from "@/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { ADMIN } from "@/constants/constants";
import { RenderMounted } from "@/components/render-mounted";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.log("error fetching user data", error);
      return;
    }

    if (data.type === ADMIN) return redirect("/");
  }

  return (
    <RenderMounted>
      <Header />
      <main className="min-h-[calc(100svh-128px)] py-3">
      {children}
      </main>
      <Footer />
    </RenderMounted>
  );
}
