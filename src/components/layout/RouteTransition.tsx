import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RouteTransition.module.css';

type Props = { children: ReactNode };

export function RouteTransition({ children }: Props) {
  const { pathname } = useLocation();
  const [displayedPath, setDisplayedPath] = useState(pathname);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (pathname === displayedPath) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase('out');
    const id = window.setTimeout(() => {
      setDisplayedPath(pathname);
      setDisplayedChildren(children);
      setPhase('in');
    }, 220);
    return () => window.clearTimeout(id);
  }, [pathname, children, displayedPath]);

  return <div className={`${styles.shell} ${styles[phase]}`}>{displayedChildren}</div>;
}
