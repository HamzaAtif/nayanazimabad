'use client';

import { useId, useState } from 'react';
import { PROJECTS } from '@/data/projects';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill every field, humans never see this one.
    if (String(data.get('company') ?? '').trim()) {
      setStatus('sent');
      setMessage('Thanks — we will be in touch shortly.');
      return;
    }

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      project: String(data.get('project') ?? ''),
      message: String(data.get('message') ?? '').trim(),
    };

    if (payload.name.length < 2) {
      setStatus('error');
      setMessage('Please enter your name.');
      return;
    }
    if (!EMAIL_RE.test(payload.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (payload.message.length < 10) {
      setStatus('error');
      setMessage('Please tell us a little more (at least 10 characters).');
      return;
    }

    setStatus('sending');
    setMessage(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('sent');
      setMessage('Thank you — your enquiry has been received. The sales team will call you back.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Sorry, we could not send that. Please call the UAN or email us directly.');
    }
  }

  const field =
    'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40';

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium">
            Name <span className="text-gold-500">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={field}
            placeholder="Ahmed Khan"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
            Email <span className="text-gold-500">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="+92 3xx xxxxxxx"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-project`} className="mb-1.5 block text-sm font-medium">
            Project of interest
          </label>
          <select id={`${formId}-project`} name="project" className={field} defaultValue="">
            <option value="">Not sure yet</option>
            {PROJECTS.map((project) => (
              <option key={project.slug} value={project.slug}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
          Message <span className="text-gold-500">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          required
          className={field}
          placeholder="Which apartment size are you looking for, and when would you like to visit?"
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input id={`${formId}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p className="text-xs text-ink-soft">
          We only use your details to answer this enquiry. See the privacy note.
        </p>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${
          status === 'error' ? 'text-red-700' : status === 'sent' ? 'text-teal-700' : 'text-ink-soft'
        }`}
      >
        {message ?? ''}
      </p>
    </form>
  );
}
