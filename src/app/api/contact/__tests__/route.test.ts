/**
 * @jest-environment node
 */
import { POST } from '../route';

function request(body: unknown) {
  return new Request('https://example.test/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const valid = {
  name: 'Ayesha Ali',
  email: 'ayesha@example.com',
  phone: '+92 300 1234567',
  project: 'signature-tower',
  message: 'Please share the payment plan for a three bed apartment.',
};

describe('POST /api/contact', () => {
  it('accepts a valid enquiry', async () => {
    const response = await POST(request(valid));
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it('rejects an invalid email', async () => {
    const response = await POST(request({ ...valid, email: 'not-an-email' }));
    expect(response.status).toBe(422);
  });

  it('rejects a message that is too short', async () => {
    const response = await POST(request({ ...valid, message: 'hi' }));
    expect(response.status).toBe(422);
  });

  it('rejects an unknown project slug', async () => {
    const response = await POST(request({ ...valid, project: 'not-a-project' }));
    expect(response.status).toBe(422);
  });

  it('rejects phone numbers containing letters', async () => {
    const response = await POST(request({ ...valid, phone: 'call me maybe' }));
    expect(response.status).toBe(422);
  });

  it('rejects malformed JSON', async () => {
    const response = await POST(
      new Request('https://example.test/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not json',
      }),
    );
    expect(response.status).toBe(400);
  });
});
