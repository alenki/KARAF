import { Fragment, type ReactNode } from 'react';

type Props = {
  html: string;
};

/**
 * Render translation strings that contain inline <em> markers as real React nodes.
 * Only <em> is supported — other tags are stripped. Whitelist-only by design.
 */
export function RichText({ html }: Props): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /<em>([\s\S]*?)<\/em>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{html.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(<em key={key++}>{match[1]}</em>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    parts.push(<Fragment key={key++}>{html.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
