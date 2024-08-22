export const jsx = async (strings: TemplateStringsArray, ...args: any[]) => {
  const result = [];

  for (let i = 0; i <= strings.length; i++) {
    if (strings[i]) result.push(strings[i]);
    if (args[i]) {
      result.push(
        typeof args[i] === "function" ? await args[i]() : await args[i],
      );
    }
  }

  return result.join("").split("\\n").join("\n").trim();
};

export const defineComponent =
  (render: RenderFunction) =>
  async (
    props: Props | string = {},
    content: Component | string | undefined = undefined,
  ): Promise<Component | string> => {
    if (typeof props === "string") {
      content = props;
      props = { children: null };
    }

    if (!props || typeof props !== "object") {
      throw new Error("Expected props");
    }

    props.children = content;

    return await render(props);
  };

export const view = async (path: string, props: Props = {}) => {
  const dat = await import(path, {
    with: { type: "text" },
  });
  const func = eval(`defineComponent(async (props) => jsx\`${dat.default}\`)`);
  return func(props);
};
