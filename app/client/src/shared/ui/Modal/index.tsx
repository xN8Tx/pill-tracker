import * as React from "react";
import { createPortal } from "react-dom";

import { Button } from "../Button";
import { cn } from "@/shared/lib";

interface IModal {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Content: typeof ModalContent;
  Footer: typeof ModalFooter;
  Trigger: typeof ModalTrigger;
  Root: typeof ModalRoot;
  Close: typeof ModalClose;
  Backdrop: typeof ModalBackdrop;
}

type ModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType,
);

type ModalProviderProps = {
  isModalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ModalProvider = ({
  children,
  isModalOpen,
  setModalOpen,
}: ModalProviderProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ModalContext.Provider
      value={{ open: isModalOpen ?? open, setOpen: setModalOpen ?? setOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Modal.Root />");
  }

  return context;
}

type ModalRootProps = React.HTMLAttributes<HTMLDivElement> & {
  isModalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalRoot = React.forwardRef<HTMLDivElement, ModalRootProps>(
  ({ className, isModalOpen, setModalOpen, ...props }, ref) => (
    <ModalProvider isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
      <div ref={ref} className={cn(className)} {...props} />
    </ModalProvider>
  ),
);
ModalRoot.displayName = "Modal Root";

const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { setOpen } = useModal();
  return (
    <Button
      ref={ref}
      className={cn(className)}
      {...props}
      onClick={() => setOpen(true)}
    />
  );
});
ModalTrigger.displayName = "Modal Trigger";

const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { setOpen } = useModal();
  return (
    <Button
      ref={ref}
      className={cn(className)}
      {...props}
      onClick={() => setOpen(false)}
    />
  );
});
ModalClose.displayName = "Modal Close";

const ModalBackdrop = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open } = useModal();

  if (!open) return null;

  return createPortal(
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 backdrop-blur flex items-center justify-center",
        className,
      )}
      {...props}
    />,
    document.getElementById("modal") as HTMLDivElement,
  );
});
ModalBackdrop.displayName = "Modal Backdrop";

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
ModalBody.displayName = "Modal Body";

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ModalHeader.displayName = "Modal Header";

const ModalTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = "Modal Title";

const ModalDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ModalDescription.displayName = "Modal Description";

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ModalContent.displayName = "ModalContent";

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
ModalFooter.displayName = "Modal Footer";

const Modal: IModal = {
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Content: ModalContent,
  Footer: ModalFooter,
  Trigger: ModalTrigger,
  Root: ModalRoot,
  Close: ModalClose,
  Backdrop: ModalBackdrop,
};

export { Modal };
