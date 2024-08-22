import { definePage } from "@/server";
import { jsx, defineComponent, view } from "@/shared";

export const Page = defineComponent(
  (props: PageProps) => jsx`
<h1 style="color: blue">List of gems</h1>
  ${List}`,
);

export const List = defineComponent(async (props: PageProps) => {
  return view("@/server/data/index.dat");
});

export default definePage(Page);
