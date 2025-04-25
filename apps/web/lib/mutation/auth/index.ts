export async function MutateRequest(url: string, { arg }: { arg: any }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  console.log('res', res);
  const contentType = res.headers.get('content-type');
  if (res.ok) {
    if (contentType?.includes('application/json')) {
      return res.json();
    }
    return {}; // or return res.text() if your API sends plain text
  }
  if (!res.ok) {
    const error = await res.json();
    return { message: error.message, status: 409 };
  }
  return res.json();
}
