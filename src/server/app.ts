import type { Serve } from "bun";

const options = {
  dir: "src/server/pages",
  style: "nextjs",
} satisfies FileSystemRouterOptions;

const router = new Bun.FileSystemRouter(options);

/**
 * Provide a configurable app module.
 */
export default {
  async fetch(req) {
    const url = new URL(req.url);
    const result = router.match(url.pathname);

    if (!result) {
      return new Response("404", { status: 404 });
    }

    const page = (await import(result.filePath)).default;

    const stream = page({
      params: result.params,
      query: Object.fromEntries(url.searchParams),
      headers: req.headers,
    });

    return new Response(stream, {
      headers: { "content-type": "text/html" },
    });
  },
} as Serve;
