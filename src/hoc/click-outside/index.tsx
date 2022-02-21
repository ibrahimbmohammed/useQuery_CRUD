import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClickOutside: () => void;
}

const ClickOutside = ({ className, onClickOutside, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent | KeyboardEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      onClickOutside();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ClickOutside;
