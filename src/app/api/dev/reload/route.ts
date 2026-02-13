let controller: ReadableStreamDefaultController | null = null;

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response("", { status: 404 });
  }

  if (controller) {
    controller.enqueue("data: reload\n\n");
    return Response.json({ message: "reloaded" });
  }

  return new Response(
    new ReadableStream({
      start(c) {
        controller = c;
        c.enqueue("data: connected\n\n");
      },
      cancel() {
        controller = null;
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      }
    }
  );
}
