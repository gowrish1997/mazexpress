// written by raunak

import Link from "next/link";
import { useRouter } from "next/router";

export default function LanguageSwitcher(props: { color: string }) {
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <span className="text-muted cursor-pointer">
      {otherLocales?.map((locale) => {
        const { pathname, query, asPath } = router;
        return (
          <span key={"locale-" + locale} className={`text-[${props.color}]`}>
            <Link href={{ pathname, query }} as={asPath} locale={locale}>
              {locale === "en" ? "English" : "عربى"}
            </Link>
          </span>
        );
      })}
    </span>
  );
}
