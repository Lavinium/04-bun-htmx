import { jsx, defineComponent } from "../../shared";

const title = "My Page";

const fragment = defineComponent((props: PageProps) => {
  return jsx`${props.headers.get("hx-boosted") ? props.fragment : props.children}`;
});

export default defineComponent((props: PageProps) =>
  fragment(
    Object.assign(props, { fragment: props.children }),
    jsx`
  <!doctype html>
  <html>
    <head>
      <script src="https://unpkg.com/htmx.org@2.0.2"></script>
    </head>
    <body>
      <h1>${title}</h1>
      <div role="tablist" hx-target="#post">
        <a role="tab" href="/" hx-boost="true">Home</a> |
        <a role="tab" href="/blog/dog" hx-boost="true">Dog</a> |
        <a role="tab" href="/blog/cat" hx-boost="true">Cat</a> |
        <a role="tab" href="/blog/horse" hx-boost="true">Horse</a>
      </div>
      <main id="post">${props.children}</main>
    </body>
  </html>
`,
  ),
);
