'use client';

import { useTranslations } from '@/i18n/api.client';
import type { ChildKeySegments } from '@/i18n/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function MagicianProfile() {
  const t = useTranslations('portfolio');

  // ✅ Standard translation (string keys)
  const title = t('title');

  // ✅ raw() with full type safety - returns the entire object
  const profile = t.raw('user.profile');
  // Type: { heading: string, bio: string, settings: { title: string, themeLabel: string, languageLabel: string } }

  // ✅ raw() for deeply nested objects
  const settings = t.raw('user.profile.settings');
  // Type: { title: string, themeLabel: string, languageLabel: string }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{profile.bio}</p>
        <div className="rounded-lg border bg-secondary p-4">
          <h4 className="font-semibold text-secondary-foreground">{settings.title}</h4>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-secondary-foreground">{settings.themeLabel}:</span> Dark
            </p>
            <p>
              <span className="font-medium text-secondary-foreground">{settings.languageLabel}:</span> English
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TestimonialProps {
  // ✅ Type-safe dynamic keys - only allows 'john' | 'jane'
  itemKey: ChildKeySegments<'portfolio.testimonials.items'>;
}

export function TestimonialCard({ itemKey }: TestimonialProps) {
  const t = useTranslations('portfolio');

  // ✅ Combine dynamic key with raw() for full object access
  const testimonial = t.raw(`testimonials.items.${itemKey}`);
  // Type: { name: string, text: string, rating: number }

  return (
    <Card>
      <CardContent className="p-6">
        <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
          "{testimonial.text}"
        </blockquote>
        <footer className="mt-4">
          <p className="text-sm font-semibold text-foreground">— {testimonial.name}</p>
          <div className="mt-1 flex items-center">
            <p className="text-sm text-yellow-500">{'⭐'.repeat(testimonial.rating)}</p>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
