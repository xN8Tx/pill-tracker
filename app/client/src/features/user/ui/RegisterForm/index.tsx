import type { RegisterData } from "../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AnimatedButton, Card, Form } from "@/shared/ui";
import { PasswordInput } from "@/widgets";
import { Input } from "@/shared/ui";

import { registerDataSchema } from "../../validation";
import { useRegister } from "../../hooks";
import { Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(registerDataSchema) });

  const { isLoading, mutateAsync } = useRegister();

  const onSubmit = async (data: RegisterData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      // TODO: Нормальную обработку
      console.log(error);
    }
  };

  return (
    <Card.Root className="w-full">
      <Card.Header>
        <Card.Title>💊 Зарегистрировать аккаунт</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", { required: true })}
            label="Имя пользователя"
            labelColor="bg-card"
            error={errors.username?.message}
            icon={
              <User
                width={16}
                height={16}
                strokeWidth={2}
                aria-hidden="true"
                className="pointer-events-none"
              />
            }
            aria-invalid={errors.username ? "true" : "false"}
            disabled={isLoading || isSubmitting}
          />
          <Input
            type="email"
            label="Почта"
            labelColor="bg-card"
            {...register("email", { required: true })}
            icon={
              <Mail
                width={16}
                height={16}
                strokeWidth={2}
                aria-hidden="true"
                className="pointer-events-none"
              />
            }
            error={errors.email?.message}
            aria-invalid={errors.email ? "true" : "false"}
            disabled={isLoading || isSubmitting}
          />
          <PasswordInput
            label="Пароль"
            labelColor="bg-card"
            {...register("password", { required: true })}
            error={errors.password?.message}
            aria-invalid={errors.password ? "true" : "false"}
            disabled={isLoading || isSubmitting}
          />
          <PasswordInput
            label="Подтвердите пароль"
            labelColor="bg-card"
            {...register("confirmPassword", { required: true })}
            error={errors.confirmPassword?.message}
            araia-invalid={errors.confirmPassword ? "true" : "false"}
            disabled={isLoading || isSubmitting}
          />
          <AnimatedButton
            className="mt-4"
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            Зарегистрироваться
          </AnimatedButton>
        </Form>
      </Card.Content>
      <Card.Footer>
        <p className="text-center text-sm text-muted-foreground">
          Уже зарегистрированы?{" "}
          <Link
            to="/auth"
            className="underline text-foreground hover:text-blue-500 transition"
          >
            Войти
          </Link>
        </p>
      </Card.Footer>
    </Card.Root>
  );
};
