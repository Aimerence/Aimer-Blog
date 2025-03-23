// Heavy inspiration from starlight: https://github.com/withastro/starlight/blob/main/packages/starlight/utils/generateToC.ts
import type { MarkdownHeading } from "astro";

export interface TocItem extends MarkdownHeading {
  children: Array<TocItem>;
}

function injectChild(items: Array<TocItem>, item: TocItem) {
  const lastItem = items.at(-1);
  if (!lastItem) {
    items.push(item);
    return;
  }

  const lastItemDepth = lastItem.depth;
  const itemDepth = item.depth;

  if (itemDepth > lastItemDepth) {
    injectChild(lastItem.children, item);
    return;
  }

  items.push(item);
}

export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
  const bodyHeadings = headings.filter(({ depth }) => depth >= 2 && depth <= 4);
  const toc: Array<TocItem> = [];

  for (const heading of bodyHeadings) {
    injectChild(toc, { ...heading, children: [] });
  }

  return toc;
}