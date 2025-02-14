import type { Calendar, CreateCalendar } from "../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import {
  Delete,
  Edit,
  Calendar as CalendarIcon,
  Pencil,
  Route,
  X,
} from "lucide-react";

import { getRemainsDays, getEndDate, getDayPassed } from "../../lib";
import { useDeleteCalendar, useEditCalendar } from "../../hooks";
import { calendarSchema } from "../../validation";

import { Card, AnimatedButton, Input, Modal, Form } from "@/shared/ui";
import { AreYouSureModal } from "@/widgets";

type EditCalendarProps = Pick<Calendar, "startDate"> &
  Pick<Calendar, "days"> &
  Pick<Calendar, "title"> &
  Pick<Calendar, "documentId">;

export const EditCalendar = ({
  startDate,
  days,
  title,
  documentId,
}: EditCalendarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCalendar>({
    values: {
      startDate: startDate,
      days: days,
      title: title,
    },
    resolver: zodResolver(calendarSchema),
  });

  const { isLoading, mutateAsync } = useEditCalendar();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateCalendar) => {
    try {
      await mutateAsync({ data, documentId: documentId });
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
    <Modal.Root className="h-full">
      <Modal.Trigger
        aria-label="Редактировать"
        variant="secondary"
        className="hover:bg-secondary/30"
        disabled={isLoading}
      >
        <Edit />
      </Modal.Trigger>
      <Modal.Backdrop className="container">
        <Modal.Body className="w-full">
          <Modal.Header className="w-full flex flex-row justify-between items-center">
            <Modal.Title>Редактировать календарь</Modal.Title>
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
                  <CalendarIcon
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
                Изменить
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

export const ShowCalendar = (props: Calendar) => {
  const { title, startDate, days, documentId } = props;

  const { isLoading: isEditLoading } = useEditCalendar();
  const { mutateAsync: deleteCalendar, isLoading: isDeleteLoading } =
    useDeleteCalendar();

  const deleteHandler = async () => {
    if (isDeleteLoading) {
      return;
    }
    await deleteCalendar({ documentId: props.documentId });
  };

  const remainsDays = useMemo(() => getRemainsDays(props), [props]);
  const passedDays = useMemo(() => getDayPassed(props), [props]);
  const endDate = useMemo(() => getEndDate(props), [props]);

  return (
    <Card.Root>
      <Card.Header className="flex flex-col items-center">
        <p className="text-md">
          <span>{new Date(startDate).toLocaleDateString()}</span>
        </p>
        <p className="font-medium text-lg text-black">{title}</p>
      </Card.Header>
      <Card.Content className="my-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 items-center">
            <p className="font-medium text-xl">Пройдено дней</p>
            <p className="font-bold text-4xl text-center">
              {passedDays >= days ? "Финал" : passedDays}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <p className="text-center">
              Всего дней
              <br />
              <span>{days}</span>
            </p>
            <p className="text-center">
              Осталось дней
              <br />
              <span>{remainsDays}</span>
            </p>
            <p className="text-center">
              Финал
              <br />
              <span>{endDate.toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-center gap-2">
        <EditCalendar
          title={title}
          startDate={startDate}
          days={days}
          documentId={documentId}
        />
        <AreYouSureModal
          title="Вы уверены, что хотите удалить препарат?"
          action={deleteHandler}
          triggerProps={{
            variant: "secondary",
            className: "bg-red-400 hover:bg-red-300",
            disabled: isEditLoading,
          }}
        >
          <Delete />
        </AreYouSureModal>
      </Card.Footer>
    </Card.Root>
  );
};
