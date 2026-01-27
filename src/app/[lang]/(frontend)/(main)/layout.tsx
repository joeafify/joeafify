import MainNavbar from "@/components/MainNavbar";
import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <MainNavbar dict={dict} />
      {children}
    </>
  );
}
