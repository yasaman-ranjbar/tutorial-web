"use client";

import Button from "@/app/[lng]/_components/button/button";
import { useTranslation } from "@/app/i18n/client";
import { LanguageProps } from "@/types/translation";
import { SignInProps } from "../types/siginin.types";
import { useForm } from "react-hook-form";
import { TextInput } from "@/app/[lng]/_components/form-input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/stores/notification.store";
import { signInSchema } from "../types/signin.schema";
import { signInAction } from "@/actions/auth";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const SignInForm = ({ lng }: LanguageProps) => {
  const { t } = useTranslation(lng!);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInProps>({
    resolver: zodResolver(signInSchema),
  });

  const [formState, actions] = useFormState(signInAction, null);

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const router = useRouter();

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      showNotification({
        message: formState.error.detail!,
        type: "error",
      });
    } else if (formState && formState.isSuccess) {
      router.push(`/fa/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: t("sendingVerificationCode"),
        type: "info",
      });
    }
  }, [formState, showNotification, getValues, router]);

  const onSubmit = (data: SignInProps) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    actions(formData);
    // signIn.submit(data);
  };

  return (
    <>
      <h5 className="text-2xl">{t("loginRegister")}</h5>
      <p className="mt-2">{t("loginDescription")}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-16"
      >
        <TextInput<SignInProps>
          placeholder={t("mobileNumber")}
          register={register}
          name={"mobile"}
          errors={errors}
        />

        <Button type="submit" variant="primary">
          {t("confirmCode")}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
