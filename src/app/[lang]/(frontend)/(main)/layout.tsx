import MainNavbar from "@/components/MainNavbar";
import { getDictionary } from "@/get-dictionary";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
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
