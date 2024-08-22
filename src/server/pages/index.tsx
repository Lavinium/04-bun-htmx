import { definePage, Magic, matchMethod } from "@/server";
import { jsx, defineComponent, view } from "@/shared";

const posts: string[] = [];

// Defined as const for magic page fragments!
export const Page = defineComponent(
  async (props: PageProps) => jsx`
    <h1 style="color: blue">Feedback</h1>
    <p>Please provide feedback!</p>
    ${Magic}
    <ul id="posts">
      ${Posts}
    </ul>
  `,
);

export const Posts = defineComponent(
  async (props: PageProps) => jsx`
      ${Post(props)}
`,
);

export const getPost = defineComponent(async (props: PageProps) => {
  return posts
    .slice(-20)
    .map(
      (content) =>
        `<li>
          <strong>new: ${content}</strong>
        </li>`,
    )
    .join("");
});

export const storePost = defineComponent(async (props: PageProps) => {
  const content = props.body.get("post");
  if (content) {
    posts.push(content);
  }
  return (
    content &&
    jsx`
      <li>
        <strong>new: ${content}</strong>
      </li>
      `
  );
});

export const Post = matchMethod({
  GET: getPost,
  POST: storePost,
});

// Varying default layout will create session behaviors.
export default definePage(Page);
