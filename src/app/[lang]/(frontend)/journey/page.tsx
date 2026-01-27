import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import JourneyClient from "./JourneyClient";
import { getJourneyItemsListing } from "./actions";

export default async function JourneyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const items = await getJourneyItemsListing({ locale: lang });

  return <JourneyClient lang={lang} dict={dict} initialItems={items} />;
}
