declare type FileSystemRouterOptions = ConstructorParameters<
  typeof Bun.FileSystemRouter
>[0];

declare type PageProps = Props<
  Pick<MatchedRoute, "params" | "query"> & Pick<Request, "headers", "method">
>;

declare type Page = React.FC<PageProps>;

declare type Props<T = {}> = T & { children?: any };

type RenderFunction<T = any> = (
  props: Props<T>,
  ...args: any[]
) => Promise<Component | string>;

type Component = (
  props: Props | string = {},
  content: Component | string | undefined = undefined,
) => Promise<Component | string>;
