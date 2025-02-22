import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { Button, Modal } from "@/shared/ui";

interface AreYouSureModalProps {
  children: React.ReactNode;
  title: string;
  triggerProps?: React.ComponentProps<typeof Modal.Trigger>;
  className?: string;
  disabled?: boolean;
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
  disabled = false,
}: AreYouSureModalProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const agreeHandler = async () => {
    try {
      await action();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.error.message ?? "Упс, что-то пошло не так",
        );
      } else {
        toast.error("Упс, что-то пошло не так");
      }
      console.log(error);
    } finally {
      setIsModalOpen(false);
    }
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
      <Modal.Trigger disabled={disabled} {...triggerProps}>
        {children}
      </Modal.Trigger>
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
