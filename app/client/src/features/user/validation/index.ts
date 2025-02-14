import { z } from "zod";

export const registerDataSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Имя пользователя может содержать только буквы, цифры and нижние подчеркивания (_)",
      ),
    email: z.string().email("Введите корректный email"),
    password: z
      .string()
      .min(5, "Пароль должен быть больше 5 символов")
      .max(20, "Пароль должен быть меньше 20 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // path of error
  });

export const loginDataSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z
    .string()
    .min(5, "Пароль должен быть больше 5 символов")
    .max(20, "Пароль должен быть меньше 20 символов"),
});
