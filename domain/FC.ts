/**
 * These types are meant to be used to replace React.FC.
 *
 * React.FC is not great for multiple reasons:
 * https://github.com/facebook/create-react-app/pull/8177
 *
 * Clay Functional Components are more lightweight and
 * flexible.
 */

import * as React from "react";

// extends a type T with a `children` item
type PropsWithChildren<T, C = React.ReactNode> = T & {
  children?: C;
};

// a replacement for React.FC, includes children, if your component does not take children, use ChildLessFC
export interface FC<T = {}> {
  (props: PropsWithChildren<T>): React.JSX.Element | null;
  displayName?: string;
}

// this component does not take children
export interface ChildlessFC<T = {}> {
  (props: T): React.JSX.Element | null;
  displayName?: string;
}
