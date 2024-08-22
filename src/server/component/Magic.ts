import { defineComponent, jsx } from "@/shared";

export const Magic = defineComponent(
  (props: PageProps) =>
    jsx`
      <form method="post" action="/">
        <textarea name="post"></textarea>
        <button type="submit" hx-target="#posts" hx-post="/" hx-swap="beforeend" hx-boost="true">
            Click Me!
        </button>
      </form>
`,
);
