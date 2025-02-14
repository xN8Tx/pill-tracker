import type { InputProps } from "@/shared/ui";

import { Eye, EyeOff } from "lucide-react";
import React from "react";

import { Input } from "@/shared/ui";

const PasswordIconButton = ({
  isVisible,
  setIsVisible,
  ...props
}: React.ComponentProps<"button"> & {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button {...props} onClick={() => setIsVisible((isVisible) => !isVisible)}>
      {isVisible ? (
        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Eye size={16} strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
};

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <Input
        ref={ref}
        {...props}
        type={isVisible ? "text" : "password"}
        icon={
          <PasswordIconButton
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        }
      />
    );
  },
);
