// Locale switch. Templates read everything from `L`; build.mjs calls
// setLocale('ar' | 'en') before rendering each language's pages.
import * as arSite from './ar/site.mjs';
import * as arSvc from './ar/services.mjs';
import * as arSec from './ar/sectors.mjs';
import { t as arT } from './ar/copy.mjs';
import * as enSite from './en/site.mjs';
import * as enSvc from './en/services.mjs';
import * as enSec from './en/sectors.mjs';
import { t as enT } from './en/copy.mjs';

const bundle = (lang, site, svc, sec, t) => ({
  lang, dir: lang === 'ar' ? 'rtl' : 'ltr', ogLocale: lang === 'ar' ? 'ar_EG' : 'en_US',
  base: lang === 'ar' ? '' : 'en/',            // URL prefix of this language
  ...site, ...svc, ...sec, t,
});

const bundles = {
  ar: bundle('ar', arSite, arSvc, arSec, arT),
  en: bundle('en', enSite, enSvc, enSec, enT),
};

export const L = {};
export const setLocale = (lang) => {
  for (const k of Object.keys(L)) delete L[k];
  Object.assign(L, bundles[lang]);
  return L;
};
export const langs = Object.keys(bundles);
