import type { Pill, CreatePills } from "../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import {
  Delete,
  Edit,
  TimerReset,
  Calendar,
  CalendarPlus2,
  PillBottle,
  Tablets,
  X,
} from "lucide-react";

import { getRemainsDays, getRemainsPills } from "../../lib";
import { useDeletePill, useEditPill } from "../../hooks";
import { pillSchema } from "../../validation";

import { Button, Card, AnimatedButton, Input, Modal, Form } from "@/shared/ui";
import { AreYouSureModal } from "@/widgets";

type EditPillProps = Pick<Pill, "startDate"> &
  Pick<Pill, "fullCount"> &
  Pick<Pill, "dailyCount"> &
  Pick<Pill, "title"> &
  Pick<Pill, "documentId">;

export const EditPill = ({
  startDate,
  fullCount,
  dailyCount,
  title,
  documentId,
}: EditPillProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePills>({
    values: {
      startDate: startDate,
      fullCount: fullCount,
      dailyCount: dailyCount,
      title: title,
    },
    resolver: zodResolver(pillSchema),
  });

  const { isLoading, mutateAsync } = useEditPill();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreatePills) => {
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
            <Modal.Title>Редактировать препарат</Modal.Title>
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

export const ShowPills = (props: Pill) => {
  const { title, startDate, fullCount, dailyCount, documentId } = props;

  const { mutateAsync: editPill, isLoading: isEditLoading } = useEditPill();
  const { mutateAsync: deletePill, isLoading: isDeleteLoading } =
    useDeletePill();

  const deleteHandler = async () => {
    if (isDeleteLoading) {
      return;
    }
    await deletePill({ documentId: props.documentId });
  };

  const refreshHandler = useCallback(async () => {
    if (isEditLoading) {
      return;
    }

    const data = {
      startDate: new Date(),
    };

    await editPill({ documentId: props.documentId, data });
  }, [props, editPill, isEditLoading]);

  const remainsDays = useMemo(() => getRemainsDays(props), [props]);
  const remainsPills = useMemo(() => getRemainsPills(props), [props]);

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
            <p className="font-medium text-xl">Осталось таблеток</p>
            <p className="font-bold text-4xl text-center">
              {remainsPills <= 0 ? 0 : remainsPills}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <p className="text-center">
              Всего таблеток
              <br />
              <span>{fullCount}</span>
            </p>
            <p className="text-center">
              Дневная доза
              <br />
              <span>{dailyCount}</span>
            </p>
            <p className="text-center">
              Осталось дней
              <br />
              <span>{remainsDays <= 0 ? 0 : remainsDays}</span>
            </p>
          </div>
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-center gap-2">
        <EditPill
          title={title}
          startDate={startDate}
          fullCount={fullCount}
          dailyCount={dailyCount}
          documentId={documentId}
        />
        <AreYouSureModal
          title="Вы уверены, что хотите ообновить кол-во препарата?"
          action={refreshHandler}
          triggerProps={{
            variant: "secondary",
            className: "hover:bg-secondary/30",
            disabled: isEditLoading,
          }}
        >
          <TimerReset />
        </AreYouSureModal>
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
