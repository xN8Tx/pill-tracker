import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";

import { AnimatedButton, Input, Modal } from "@/shared/ui";
import {
  Calendar,
  CalendarPlus2,
  PillBottle,
  Plus,
  Tablets,
  X,
} from "lucide-react";

import { CreatePills } from "../../types";
import { Form } from "@/shared/ui";

import { useCreatePill } from "../../hooks";
import { pillSchema } from "../../validation";

export const AddPills = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePills>({ resolver: zodResolver(pillSchema) });

  const { isLoading, mutateAsync } = useCreatePill();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: CreatePills) => {
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
            <Modal.Title>Добавить препарат</Modal.Title>
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
                  <Tablets
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
                label="Кол-во в упаковке"
                labelColor="bg-card"
                {...register("fullCount", {
                  required: true,
                  setValueAs: (val) => Number(val),
                })}
                icon={
                  <PillBottle
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />
                }
                error={errors.fullCount?.message}
                aria-invalid={errors.fullCount ? "true" : "false"}
                disabled={isLoading || isSubmitting}
              />
              <Input
                type="number"
                label="Кол-во в день"
                labelColor="bg-card"
                {...register("dailyCount", {
                  required: true,
                  setValueAs: (val) => Number(val),
                })}
                icon={
                  <CalendarPlus2
                    width={16}
                    height={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />
                }
                error={errors.dailyCount?.message}
                aria-invalid={errors.dailyCount ? "true" : "false"}
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
