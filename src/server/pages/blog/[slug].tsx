import { definePage } from "@/server";
import { jsx, defineComponent } from "../../../shared";

export const Page = defineComponent(
  (props: PageProps) => jsx`
<h1 style="color: blue">Blog Post</h1>
<p>${props.params.slug}</p>
`,
);

export default definePage(Page);
