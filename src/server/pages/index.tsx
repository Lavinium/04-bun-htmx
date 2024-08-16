import { Page } from "../../server";
import { jsx, defineComponent } from "../../shared";

// todo: add reactivity
export default defineComponent((props) =>
  Page(
    props,
    jsx`
      <h1 style="color: blue">Welcome!</h1>
      <p>Checkout the blog lol!</p>
`,
  ),
);
