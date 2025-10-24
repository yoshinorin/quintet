/**
 * Returns 404 for all requests to .well-known paths
 */
export async function GET() {
  return new Response(null, { status: 404 });
}

export async function POST() {
  return new Response(null, { status: 404 });
}

export async function PUT() {
  return new Response(null, { status: 404 });
}

export async function DELETE() {
  return new Response(null, { status: 404 });
}

export async function PATCH() {
  return new Response(null, { status: 404 });
}

export async function HEAD() {
  return new Response(null, { status: 404 });
}

export async function OPTIONS() {
  return new Response(null, { status: 404 });
}
