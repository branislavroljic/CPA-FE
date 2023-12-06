import { useState } from "react";
import { CardContent, Grid, Typography, Button, Stack } from "@mui/material";

// images
import BlankCard from "@ui/shared/BlankCard";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import passwordSchema from "./passwordSchema";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import {
  BasicInfo,
  ChangePassword,
  changePassword,
  getBasicInfo,
  updateBasicInfo,
} from "@api/user/userSettings";
import basicInfoSchema from "./basicInfoSchema";

const BasicInfoForms = () => {
  const { user } = useAuthStore((state) => state);

  const { data: userBasicInfo, refetch: refetchBasicInfo } = useQuery({
    queryKey: ["basic_info", user?.id],
    queryFn: () => getBasicInfo(user?.id),
  });

  const [userDetails, setUserDetails] = useState<BasicInfo>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
  });

  const {
    handleSubmit: handleSubmitPasswordForm,
    reset: resetPasswordForm,
    control: controlPasswordForm,
    formState: { errors: errorsPasswordForm, isValid: isValidPasswordForm },
  } = useForm<ChangePassword>({
    resolver: zodResolver(passwordSchema),
  });

  const handleCancelUserProfileUpdate = () => {
    reset();
  };

  const handleCancelPasswordUpdate = () => {
    resetPasswordForm();
  };

  const basicInfoMutation = useNotifiedMutation({
    mutationFn: updateBasicInfo,
    onSuccess: () => {
      refetchBasicInfo();
    },
    showSuccessNotification: true,
  });

  const passwordMutation = useNotifiedMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      resetPasswordForm();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateUser = (newItem: BasicInfo) => {
    if (isValid) {
      setUserDetails(newItem);
      basicInfoMutation.mutate(newItem);
    }
  };

  const submitUpdatePassword = (newItem: ChangePassword) => {
    if (isValidPasswordForm) {
      passwordMutation.mutate(newItem);
    }
  };

  return (
    <Grid container spacing={3}>
      {/*  Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t("ui.changePassword")}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t("ui.changePasswordDescription")}
            </Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 4,
                }}
                htmlFor="currentPassword"
              >
                {t("user.currentPassword")}
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="oldPassword"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.oldPassword !== undefined}
                    helperText={errorsPasswordForm.oldPassword?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="oldPassword"
                    {...field}
                  />
                )}
              />

              {/* 2 */}
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="newPassword"
              >
                {t("user.newPassword")}
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="newPassword"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.newPassword !== undefined}
                    helperText={errorsPasswordForm.newPassword?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="newPassword"
                    {...field}
                  />
                )}
              />
              {/* 3 */}
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="confirmPassword"
              >
                {t("user.confirmPassword")}
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="newPasswordConfirm"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.newPasswordConfirm !== undefined}
                    helperText={errorsPasswordForm.newPasswordConfirm?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="newPasswordConfirm"
                    {...field}
                  />
                )}
              />
            </form>
          </CardContent>
        </BlankCard>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={2}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmitPasswordForm(submitUpdatePassword)}
          >
            {t("util.save")}
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelPasswordUpdate}
          >
            {t("util.cancel")}
          </Button>
        </Stack>
      </Grid>

      {/* Edit Details */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {t("ui.personalDetails")}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              {t("ui.personalDetailsDescription")}
            </Typography>
            <form>
              <Grid container spacing={3}>
                {/* <input
                  type="hidden"
                  {...register("id", {
                    required: true,
                    value: user?.id ?? undefined,
                  })}
                /> */}
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="firstname"
                  >
                    {t("user.firstname")}
                  </CustomFormLabel>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={userBasicInfo?.name ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="name"
                        required
                        disabled={basicInfoMutation.isLoading}
                        error={errors.name !== undefined}
                        helperText={errors.name?.message}
                        placeholder={t("user.name")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="lastname"
                  >
                    {t("user.lastname")}
                  </CustomFormLabel>
                  <Controller
                    name="surname"
                    control={control}
                    defaultValue={userBasicInfo?.surname ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        variant="outlined"
                        required
                        disabled={basicInfoMutation.isLoading}
                        error={errors.surname !== undefined}
                        helperText={errors.surname?.message}
                        placeholder={t("user.surname")}
                        id="surname"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={2}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit(submitUpdateUser)}
          >
            {t("util.save")}
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelUserProfileUpdate}
          >
            {t("util.cancel")}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicInfoForms;
