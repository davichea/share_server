import { cn } from '@/lib/utils';
import React from 'react';

const Label = React.forwardRef(({ name, className, ...props }, ref) => {
  return (
    <label
      htmlFor={name}
      ref={ref}
      className={cn(`block mb-2 text-sm font-medium text-gray-500 ${className}`)}
      {...props} // Spread props here
    />
  );
});

Label.displayName = 'Label';

export default Label;
