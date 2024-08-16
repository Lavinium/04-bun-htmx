export const jsx = (strings: TemplateStringsArray, ...args: any[]) => {
  const result = [];

  for (let i = 0; i <= strings.length; i++) {
    if (strings[i]) result.push(strings[i]);
    if (args[i]) result.push(args[i]);
  }

  return result.join("").split("\\n").join("\n").trim();
};

export const defineComponent =
  (render: Function) =>
  (props: Props | string = {}, content: string | undefined = undefined) => {
    if (typeof props === "string") {
      content = props;
      props = { children: null };
    }

    if (!props || typeof props !== "object") {
      throw new Error("Expected props");
    }

    props.children = content;

    return render(props);
  };
