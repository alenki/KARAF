import { useCallback } from 'react';

export interface SplitResult {
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];
}

export function useSplitText() {
  const splitByLines = useCallback((element: HTMLElement): HTMLElement[] => {
    const text = element.textContent || '';
    const words = text.split(' ');
    element.innerHTML = '';

    // Temporarily add words to measure line breaks
    const spans = words.map((word) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.display = 'inline';
      element.appendChild(span);
      return span;
    });

    // Group by line (same offsetTop)
    const lines: HTMLElement[] = [];
    let currentLine: string[] = [];
    let currentTop = spans[0]?.offsetTop ?? 0;

    spans.forEach((span, i) => {
      if (span.offsetTop !== currentTop && currentLine.length > 0) {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden';
        const innerSpan = document.createElement('span');
        innerSpan.style.display = 'inline-block';
        innerSpan.textContent = currentLine.join(' ');
        lineDiv.appendChild(innerSpan);
        lines.push(lineDiv);
        currentLine = [];
        currentTop = span.offsetTop;
      }
      currentLine.push(words[i]);
    });

    // Last line
    if (currentLine.length > 0) {
      const lineDiv = document.createElement('div');
      lineDiv.style.overflow = 'hidden';
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.textContent = currentLine.join(' ');
      lineDiv.appendChild(innerSpan);
      lines.push(lineDiv);
    }

    element.innerHTML = '';
    lines.forEach((line) => element.appendChild(line));

    return lines;
  }, []);

  const splitByChars = useCallback((element: HTMLElement): HTMLElement[] => {
    const text = element.textContent || '';
    element.innerHTML = '';
    const chars: HTMLElement[] = [];

    for (const char of text) {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char;
      chars.push(span);
      element.appendChild(span);
    }

    return chars;
  }, []);

  return { splitByLines, splitByChars };
}
