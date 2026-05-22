import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'outline-dark' | 'ghost';
type Size = 'sm' | 'md';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type Props = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(function Button(
  { variant = 'primary', size = 'md', className = '', children, ...rest },
  ref,
) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if ((rest as ButtonAsLink).as === 'a') {
    const { as: _as, ...anchorRest } = rest as ButtonAsLink;
    void _as;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton;
  void _as;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...buttonRest}>
      {children}
    </button>
  );
});
