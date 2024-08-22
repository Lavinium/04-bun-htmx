import { jsx, defineComponent } from "@/shared";

const title = "My Page";

export const Page = defineComponent(
  async (props: PageProps) =>
    jsx`
  <!doctype html>
  <html style="background-color: cornsilk">
    <head>
      <script src="https://unpkg.com/htmx.org@2.0.2"></script>
    </head>
    <body>
      <h1>${title}</h1>
      <div role="tablist" hx-target="#page">
        <a role="tab" href="/" hx-boost="true">Home</a> |
        <a role="tab" href="/blog/gems" hx-boost="true">Gems</a> |
        <a role="tab" href="/blog/dog" hx-boost="true">Dog</a> |
        <a role="tab" href="/blog/cat" hx-boost="true">Cat</a> |
        <a role="tab" href="/blog/horse" hx-boost="true">Horse</a>
      </div>
      <main id="page">
        ${props.children}
      </main>
    </body>
  </html>
`,
);

export const definePage = (layout: Component | string) =>
  defineComponent(async (props: Props) =>
    Page(props, typeof layout === "string" ? layout : await layout(props)),
  );

export const matchMethod = (match: {
  [key: string]: RenderFunction | Component | string;
}) =>
  defineComponent((props: PageProps) => {
    const layout = match[props.method ?? "GET"];
    return jsx`${layout(props)}`;
  });
