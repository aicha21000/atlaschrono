import { cookies } from 'next/headers';
import { dictionaries, Lang } from './dictionaries';

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang')?.value as Lang;
  return lang === 'ar' ? 'ar' : 'fr';
}

export async function getDictionary() {
  const lang = await getLang();
  return dictionaries[lang];
}
