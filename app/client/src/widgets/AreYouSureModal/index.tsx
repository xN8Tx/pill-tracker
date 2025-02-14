import { Button, Modal } from "@/shared/ui";
import React from "react";

interface AreYouSureModalProps {
  children: React.ReactNode;
  title: string;
  triggerProps?: React.ComponentProps<typeof Modal.Trigger>;
  className?: string;
  action:
    | ((value?: unknown) => Promise<unknown>)
    | ((value?: unknown) => unknown);
}

export const AreYouSureModal = ({
  action,
  children,
  className,
  title,
  triggerProps,
}: AreYouSureModalProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const agreeHandler = async () => {
    await action();
    setIsModalOpen(false);
  };

  const disagreeHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal.Root
      className={className}
      isModalOpen={isModalOpen}
      setModalOpen={setIsModalOpen}
    >
      <Modal.Trigger {...triggerProps}>{children}</Modal.Trigger>
      <Modal.Backdrop className="px-4">
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Content className="w-full flex justify-center items-center gap-3">
            <Button onClick={agreeHandler}>Да</Button>
            <Button variant="destructive" onClick={disagreeHandler}>
              Нет
            </Button>
          </Modal.Content>
        </Modal.Body>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
