import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PROJECT_SLUGS } from '@/data/projects';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()\s-]*$/, 'Phone may only contain numbers and + ( ) - characters')
    .optional()
    .or(z.literal('')),
  project: z
    .string()
    .refine((value) => value === '' || PROJECT_SLUGS.includes(value), 'Unknown project')
    .optional(),
  message: z.string().trim().min(10).max(4000),
});

/** Naive in-memory rate limit — enough to blunt casual abuse on a serverless instance. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

// The limiter is skipped under test so the suite does not trip its own bucket.
const RATE_LIMIT_ENABLED = process.env.NODE_ENV !== 'test';

export async function POST(request: Request) {
  if (RATE_LIMIT_ENABLED && rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  // Default: log-only mode, so no PII leaves the server unless a provider is configured.
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Naya Nazimabad Website <enquiries@resend.dev>',
          to: [process.env.CONTACT_EMAIL_TO],
          subject: `Website enquiry — ${enquiry.project || 'general'}`,
          text: [
            `Name: ${enquiry.name}`,
            `Email: ${enquiry.email}`,
            `Phone: ${enquiry.phone || '—'}`,
            `Project: ${enquiry.project || '—'}`,
            '',
            enquiry.message,
          ].join('\n'),
        }),
      });
      if (!response.ok) {
        console.error('Resend delivery failed', response.status);
        return NextResponse.json(
          { ok: false, error: 'Could not deliver your enquiry. Please call the UAN.' },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error('Resend request failed', error);
      return NextResponse.json({ ok: false, error: 'Delivery service unavailable' }, { status: 502 });
    }
  } else {
    // Deliberately minimal logging: no message body, no email address.
    console.info('Contact enquiry received', {
      project: enquiry.project || 'general',
      length: enquiry.message.length,
    });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
