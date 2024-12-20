import { createClient } from "@/supabase/server";
import React from "react";
import { redirect } from "next/navigation";
import { ADMIN } from "@/constants/constants";

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


  return <div>
    {children}
  </div>;
}
