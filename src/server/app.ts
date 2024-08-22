import type { Serve } from "bun";
import { mapKeys, snakeCase, keys } from "lodash";

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

    const target = snakeCase(req.headers.get("hx-target") || "default");
    const module = await import(result.filePath);
    const moduleMap = mapKeys(
      Object.fromEntries(Object.entries(module)),
      (v, k) => snakeCase(k),
    );

    const page = (
      target in moduleMap ? moduleMap[target] : moduleMap.default
    ) as RenderFunction;

    const stream = await page({
      url: url,
      method: req.method,
      params: result.params,
      query: Object.fromEntries(url.searchParams),
      body: req.method === "POST" ? await req.formData() : undefined,
    });

    return new Response(stream.toString(), {
      headers: { "content-type": "text/html" },
    });
  },
} as Serve;
