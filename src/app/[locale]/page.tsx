import { MagicianProfile, TestimonialCard } from '@/components/MagicianProfile';
import { Button } from '@/components/ui/button';
import { getTranslations } from '@/i18n/api.server';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'portfolio' });

  const stats = t.raw('user.stats');
  const testimonialsHeading = t('testimonials.heading');

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
        </header>

        <section
          aria-labelledby="stats-heading"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-primary">247</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{stats.shows}</p>
          </div>
          <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
            <p className="text-4xl font-bold text-primary">50,000+</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{stats.audience}</p>
          </div>
        </section>

        <MagicianProfile />

        <section aria-labelledby="testimonials-heading">
          <h2
            id="testimonials-heading"
            className="mb-6 text-3xl font-bold text-foreground"
          >
            {testimonialsHeading}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <TestimonialCard itemKey="john" />
            <TestimonialCard itemKey="jane" />
          </div>
        </section>

        <footer className="flex items-center justify-center gap-4 border-t pt-8">
          <Button asChild>
            <Link href="/" locale="en">
              English
            </Link>
          </Button>
          <Button asChild>
            <Link href="/" locale="de">
              Deutsch
            </Link>
          </Button>
        </footer>
      </div>
    </main>
  );
}
