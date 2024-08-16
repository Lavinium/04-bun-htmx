declare type FileSystemRouterOptions = ConstructorParameters<
  typeof Bun.FileSystemRouter
>[0];

declare type PageProps = Props<
  Pick<MatchedRoute, "params" | "query"> & Pick<Request, "headers">
>;

declare type Page = React.FC<PageProps>;

declare type Props<T = {}> = T & { children?: any };
