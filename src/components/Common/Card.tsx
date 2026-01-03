import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = true,
  hover = false,
}) => {
  return (
    <div
      className={clsx(
        'card',
        padding && 'p-6',
        hover && 'hover:shadow-lg transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};
