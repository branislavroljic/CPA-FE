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
import { ChangePassword, changePassword } from "@api/user/userSettings";

const SecurityInfoForm = () => {
  const { user } = useAuthStore((state) => state);

  const {
    handleSubmit: handleSubmitPasswordForm,
    reset: resetPasswordForm,
    control: controlPasswordForm,
    formState: { errors: errorsPasswordForm, isValid: isValidPasswordForm },
  } = useForm<ChangePassword>({
    resolver: zodResolver(passwordSchema),
  });

  const handleCancelPasswordUpdate = () => {
    resetPasswordForm();
  };

  const passwordMutation = useNotifiedMutation({
    mutationFn: (params: { changePassword: ChangePassword; id?: number }) =>
      changePassword(params.changePassword, params.id),
    onSuccess: () => {
      resetPasswordForm();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdatePassword = (newItem: ChangePassword) => {
    if (isValidPasswordForm) {
      passwordMutation.mutate({ changePassword: newItem, id: user?.id });
    }
  };

  return (
    <Grid container justifyContent={"center"} paddingTop={5}>
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
    </Grid>
  );
};

export default SecurityInfoForm;
