import { Button } from "@headlessui/react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { SortDirection } from "@tanstack/react-table";
import { clsx } from "clsx";
import { omit } from "lodash";
import Link from "next/link";
import type React from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";

import { Icon } from "./icon";

const TableContext = createContext<{
  bleed: boolean;
  dense: boolean;
  grid: boolean;
  striped: boolean;
  useCSSSubgrid: boolean;
}>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
  useCSSSubgrid: false,
});

const cssSubgridStyles = clsx(
  "col-span-full grid w-full grid-cols-subgrid content-baseline"
);
const cssSubgridTableCellStyles = clsx(
  "flex min-h-[var(--row-height)] w-full items-center"
);

const textSizeStyles = {
  xs: "text-xs/4",
  sm: "text-sm/6",
};

export const Table = forwardRef<
  HTMLDivElement,
  {
    bleed?: boolean;
    dense?: boolean;
    grid?: boolean;
    border?: boolean;
    striped?: boolean;
    overflowX?: boolean;
    tableClassName?: string;
    tableStyle?: React.CSSProperties | null;
    size?: keyof typeof textSizeStyles;
    width?: number;
    useCSSSubgrid?: boolean;
  } & React.ComponentPropsWithoutRef<"div">
>(function Table(
  {
    bleed = false,
    dense = false,
    grid = false,
    border = false,
    striped = false,
    overflowX = true,
    useCSSSubgrid = false,
    size = "sm",
    className,
    tableClassName,
    tableStyle,
    children,
    width,
    ...props
  },
  ref
) {
  const tableContext = useMemo(() => {
    return { bleed, dense, grid, striped, useCSSSubgrid };
  }, [bleed, dense, grid, striped, useCSSSubgrid]);

  return (
    <TableContext.Provider value={tableContext}>
      <div
        {...props}
        ref={ref}
        className={clsx(
          className,
          "[--table-border-header-color:theme(colors.nightshade.200)] [--table-border-row-color:theme(colors.nightshade.200)] [--table-row-hover-color:theme(colors.nightshade.50)]",
          "-mx-[--gutter] flow-root whitespace-pre-wrap border-[var(--table-border-header-color)]",
          {
            "border-l border-r border-t": border,
            "border-b": border && striped && !grid, // Only show bottom border if striped and not grid (otherwise it's already shown by the row)
            "overflow-x-auto": overflowX,
          }
        )}
        style={
          width != null
            ? {
                width: `${width}px`,
                minWidth: `${width}px`,
                maxWidth: `${width}px`,
              }
            : undefined
        }
      >
        <div
          className={clsx("inline-block min-w-full align-middle", {
            "sm:px-[--gutter]": !bleed,
          })}
        >
          <table
            className={clsx(
              tableClassName,
              textSizeStyles[size],
              "min-w-full text-left",
              useCSSSubgrid && "grid"
            )}
            style={{
              ...tableStyle,
              ...(width != null
                ? {
                    width: `${width}px`,
                    minWidth: `${width}px`,
                    maxWidth: `${width}px`,
                  }
                : undefined),
            }}
          >
            {children}
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
});

export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"thead">) {
  const { useCSSSubgrid } = useContext(TableContext);
  return (
    <thead
      className={clsx(
        className,
        "text-content-primary",
        useCSSSubgrid && cssSubgridStyles
      )}
      {...props}
    />
  );
}

export function TableBody(props: React.ComponentPropsWithoutRef<"tbody">) {
  const { useCSSSubgrid } = useContext(TableContext);
  return (
    <tbody
      {...props}
      className={clsx(props.className, useCSSSubgrid && cssSubgridStyles)}
    />
  );
}

const TableRowContext = createContext<{
  href?: string;
  target?: string;
  title?: string;
}>({
  href: undefined,
  target: undefined,
  title: undefined,
});

export const TableRow = forwardRef<
  HTMLTableRowElement,
  {
    href?: string;
    target?: string;
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
    onContextMenu?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  } & React.ComponentProps<"tr">
>(function TableRow(
  {
    href,
    target,
    title,
    className,
    children,
    onClick,
    style,
    onContextMenu,
    ...props
  },
  ref
) {
  const { striped, useCSSSubgrid } = useContext(TableContext);

  const tableRowContext = useMemo(() => {
    return { href, target, title, onClick };
  }, [href, target, title, onClick]);

  const hasOnClick = onClick || href;

  // The style below fixes a strange Safari bug where table rows on the homepage shift to the right on mousedown.
  // It's not clear why this is happening. You can find more info here: https://github.com/clay-run/clay-base/pull/16374
  const appliedStyle = useMemo(() => {
    return {
      ...style,
      WebkitTapHighlightColor: "transparent",
    };
  }, [style]);

  return (
    <TableRowContext.Provider value={tableRowContext}>
      <tr
        ref={ref}
        {...props}
        onClick={onClick}
        onContextMenu={onContextMenu}
        className={clsx(
          className,
          hasOnClick &&
            "has-[[data-row-link][data-focus]]:outline has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-content-action",
          striped && "even:bg-border-primary/[2.5%]",
          hasOnClick && striped && "hover:bg-border-primary/5",
          hasOnClick && !striped && "hover:bg-border-primary/[2.5%]",
          useCSSSubgrid && cssSubgridStyles
        )}
        style={appliedStyle}
      >
        {children}
      </tr>
    </TableRowContext.Provider>
  );
});

export interface SortableTableHeaderProps
  extends React.ComponentPropsWithoutRef<"th"> {
  isActive: boolean;
  onSort: (sortKey: string, direction: SortDirection | null) => void;
  sortable: true;
  sortKey: string;
  sortDirection: SortDirection | null;
  width?: number;
}

export interface NonSortableTableHeaderProps
  extends React.ComponentPropsWithoutRef<"th"> {
  sortable?: false;
  width?: number;
}

export type TableHeaderProps =
  | SortableTableHeaderProps
  | NonSortableTableHeaderProps;

export function TableHeader({
  children,
  className,
  width,
  ...props
}: TableHeaderProps) {
  const { bleed, grid } = useContext(TableContext);

  const handleSort = () => {
    if (!props.sortable) {
      return;
    }
    const { onSort, sortKey, isActive, sortDirection } = props;

    let newDirection: SortDirection | null;
    if (!isActive || sortDirection === null) {
      newDirection = "asc";
    } else if (sortDirection === "asc") {
      newDirection = "desc";
    } else {
      newDirection = null;
    }
    if (onSort && sortKey) {
      onSort(sortKey, newDirection);
    }
  };
  // Ignore props that are only used internally by our TableHeader implementation and not recognized by the element.
  const domElementProps = omit(
    props,
    "sortKey",
    "sortable",
    "isActive",
    "sortDirection",
    "onSort"
  );

  return (
    <th
      {...domElementProps}
      className={clsx(
        className,
        "truncate whitespace-pre-wrap p-2 text-xs font-semibold text-content-secondary",
        "border-b border-solid border-[var(--table-border-header-color)] first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]",
        grid &&
          "border-l border-solid border-[var(--table-border-header-color)] first:border-l-0",
        !bleed && "sm:first:pl-2 sm:last:pr-2",
        props.sortable && "group/sort cursor-pointer"
      )}
      style={
        width != null
          ? {
              width: `${width}px`,
              minWidth: `${width}px`,
              maxWidth: `${width}px`,
            }
          : undefined
      }
    >
      {props.sortable ? (
        <Button className="flex w-full items-center gap-1" onClick={handleSort}>
          <span className="min-w-0">{children}</span>
          {props.isActive && props.sortDirection === "asc" && (
            <Icon
              type={ArrowUp}
              size="sm"
              weight="bold"
              className="text-content-primary"
            />
          )}
          {props.isActive && props.sortDirection === "desc" && (
            <Icon
              type={ArrowDown}
              size="sm"
              weight="bold"
              className="text-content-primary"
            />
          )}
          {(!props.isActive || !props.sortDirection) && (
            <div className="opacity-0 group-hover/sort:opacity-60">
              <Icon type={ArrowUp} size="sm" weight="bold" />
            </div>
          )}
        </Button>
      ) : (
        <div>{children}</div>
      )}
    </th>
  );
}

export function TableCell({
  className,
  children,
  width,
  ...props
}: React.ComponentPropsWithoutRef<"td"> & { width?: number }) {
  const { bleed, dense, grid, striped } = useContext(TableContext);
  const { href, target, title } = useContext(TableRowContext);
  const [cellRef, setCellRef] = useState<HTMLElement | null>(null);
  const { useCSSSubgrid } = useContext(TableContext);

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={clsx(
        className,
        "truncate whitespace-pre-wrap text-wrap text-sm",
        "relative px-2 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]",
        // horizontal border - normally we hide the bottom border for striped tables, but if we're using grid, we want to show it
        (!striped || (striped && grid)) &&
          "border-b border-solid border-[var(--table-border-row-color)]",
        // vertical border
        grid &&
          "border-l border-solid border-[var(--table-border-row-color)] first:border-l-0",
        dense ? "py-2" : "py-4",
        !bleed && "sm:first:pl-2 sm:last:pr-2",
        useCSSSubgrid && cssSubgridTableCellStyles
      )}
      style={
        width != null
          ? {
              width: `${width}px`,
              minWidth: `${width}px`,
              maxWidth: `${width}px`,
            }
          : undefined
      }
    >
      {href && (
        <Link
          data-row-link
          href={href}
          target={target}
          aria-label={title}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          className="absolute inset-0 focus:outline-none"
        />
      )}
      {children}
    </td>
  );
}

export default Table;
