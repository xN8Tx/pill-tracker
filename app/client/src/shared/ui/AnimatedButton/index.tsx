import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/shared/lib";

type MotionButtonProps = MotionProps & {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
};

type HTMLButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "ref"
>;

const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  MotionButtonProps & HTMLButtonProps
>(({ asChild = false, children, className, ...props }, ref) => {
  const classNames = cn(
    "flex h-12 px-6 items-center justify-center bg-primary text-white rounded-lg",
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement;
    return (
      <motion.span whileTap={{ scale: 0.93 }}>
        {React.cloneElement(child, {
          className: cn(child.props.className, classNames),
          ref,
          ...props,
        })}
      </motion.span>
    );
  }

  return (
    <motion.button whileTap={{ scale: 0.93 }} className={classNames} {...props}>
      {children}
    </motion.button>
  );
});

AnimatedButton.displayName = "Animated Button";

export { AnimatedButton };
