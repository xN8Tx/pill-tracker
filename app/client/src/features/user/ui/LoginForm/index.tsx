import type { LoginData } from "../../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AnimatedButton, Card, Form } from "@/shared/ui";
import { PasswordInput } from "@/widgets";
import { Input } from "@/shared/ui";

import { loginDataSchema } from "../../validation";
import { useLogin } from "../../hooks";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginDataSchema) });

  const { isLoading, mutateAsync } = useLogin();

  const onSubmit = async (data: LoginData) => {
    try {
      await mutateAsync(data);
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
    <Card.Root className="w-full">
      <Card.Header>
        <Card.Title>💊 Войти в аккаунт</Card.Title>
      </Card.Header>
      <Card.Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <AnimatedButton
            className="mt-4"
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            Войти
          </AnimatedButton>
        </Form>
      </Card.Content>
      <Card.Footer className="flex flex-col gap-3">
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link
            to="/auth/register"
            className="underline text-foreground hover:text-blue-500 transition"
          >
            Зарегистрируйтесь
          </Link>
        </p>
      </Card.Footer>
    </Card.Root>
  );
};
