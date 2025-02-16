import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";

import { AnimatedButton, Input, Modal } from "@/shared/ui";
import { Calendar, Plus, Route, Pencil, X } from "lucide-react";

import { CreateCalendar } from "../../types";
import { Form } from "@/shared/ui";

import { useCreateCalendar } from "../../hooks";
import { calendarSchema } from "../../validation";

export const AddCalendar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCalendar>({ resolver: zodResolver(calendarSchema) });

  const { isLoading, mutateAsync } = useCreateCalendar();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: CreateCalendar) => {
    try {
      await mutateAsync(data);
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data.error.message ?? "Упс, что-то пошло не так",
        );
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Modal.Root
      className="h-full"
      isModalOpen={isModalOpen}
      setModalOpen={setIsModalOpen}
    >
      <Modal.Trigger variant={"outline"} className="rounded-2xl h-full">
        <Plus />
      </Modal.Trigger>
      <Modal.Backdrop className="container">
        <Modal.Body className="w-full">
          <Modal.Header className="w-full flex flex-row justify-between items-center">
            <Modal.Title>Добавить календарь</Modal.Title>
            <Modal.Close variant="ghost">
              <X />
            </Modal.Close>
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="text"
                label="Название"
                labelColor="bg-card"
                {...register("title", { required: true })}
                icon={
                  <Pencil
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />
                }
                error={errors.title?.message}
                aria-invalid={errors.title ? "true" : "false"}
                disabled={isLoading || isSubmitting}
              />
              <Input
                type="number"
                label="Кол-во дней"
                labelColor="bg-card"
                {...register("days", {
                  required: true,
                  setValueAs: (val) => Number(val),
                })}
                icon={
                  <Route
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />
                }
                error={errors.days?.message}
                aria-invalid={errors.days ? "true" : "false"}
                disabled={isLoading || isSubmitting}
              />
              <Input
                type="date"
                className="min-w-[95%]"
                label="Дата начала"
                labelColor="bg-card"
                {...register("startDate", {
                  required: true,
                  setValueAs: (val) => new Date(val),
                })}
                icon={
                  <Calendar
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />
                }
                error={errors.startDate?.message}
                aria-invalid={errors.startDate ? "true" : "false"}
                disabled={isLoading || isSubmitting}
              />
              <AnimatedButton
                className="mt-4"
                type="submit"
                disabled={isLoading || isSubmitting}
              >
                Добавить
              </AnimatedButton>
            </Form>
          </Modal.Content>
          <Modal.Footer className="flex flex-col gap-3">
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
          </Modal.Footer>
        </Modal.Body>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
