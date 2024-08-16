import { Page } from "../../../server";
import { jsx, defineComponent } from "../../../shared";

export default defineComponent((props: PageProps) =>
  Page(
    props,
    jsx`
    <h1 style="color: blue">Blog Post</h1>
    <p>${props.params.slug}</p>
`,
  ),
);
