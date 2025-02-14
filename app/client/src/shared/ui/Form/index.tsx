import React from "react";

export const Form = ({ children, ...props }: React.ComponentProps<"form">) => {
  return (
    <form {...props} className="flex flex-col gap-5">
      {children}
    </form>
  );
};
