import { CardContent, Grid, Typography, Button, Stack } from "@mui/material";

// images
import BlankCard from "@ui/shared/BlankCard";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import {
  MessagingLinks,
  SocialMediaLinks,
  getMessagingLinks,
  getSocialMediaLinks,
  updateMessagingLinks,
  updateSocialMediaLinks,
} from "@api/user/userSettings";
import socialMediaLinksSchema from "./socialMediaLinksSchema";
import messagingLinksSchema from "./messagingLinksSchema";

const BasicInfoForms = () => {
  const { user } = useAuthStore((state) => state);

  const { data: socialMediaLinksData, refetch: refetchSocialMediaLinks } =
    useQuery({
      queryKey: ["social_media_links", user?.id],
      queryFn: () => getSocialMediaLinks(user?.id),
    });
  const { data: messagingLinksData, refetch: refetchMessagingLinksData } =
    useQuery({
      queryKey: ["messaging_links", user?.id],
      queryFn: () => getMessagingLinks(user?.id),
    });

  const {
    register: registerSocialMediaLinks,
    handleSubmit: handleSubmitSocialMediaLinks,
    reset: resetSocialMediaLinks,
    control: controlSocialMediaLinks,
    formState: {
      errors: errorsSocialMediaLinks,
      isValid: isValidSocialMediaLinks,
    },
  } = useForm<SocialMediaLinks>({
    resolver: zodResolver(socialMediaLinksSchema),
  });

  const {
    register: registerMessagingLinks,
    handleSubmit: handleSubmitMessagingLinks,
    reset: resetMessagingLinks,
    control: controlMessagingLinks,
    formState: { errors: errorsMessagingLinks, isValid: isValidMessagingLinks },
  } = useForm<MessagingLinks>({
    resolver: zodResolver(messagingLinksSchema),
  });

  const handleCancelSocialMedialLinksUpdate = () => {
    resetSocialMediaLinks();
  };

  const handleCancelMessagingLinksUpdate = () => {
    resetMessagingLinks();
  };

  const socialMediaLinksMutation = useNotifiedMutation({
    mutationFn: updateSocialMediaLinks,
    onSuccess: () => {
      refetchSocialMediaLinks();
    },
    showSuccessNotification: true,
  });

  const messagingLinksMutation = useNotifiedMutation({
    mutationFn: updateMessagingLinks,
    onSuccess: () => {
      refetchMessagingLinksData();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateSocialMediaLinks = (newItem: SocialMediaLinks) => {
    if (isValidSocialMediaLinks) {
      socialMediaLinksMutation.mutate(newItem);
    }
  };

  const submitUpdateMessagingLinks = (newItem: MessagingLinks) => {
    if (isValidMessagingLinks) {
      messagingLinksMutation.mutate(newItem);
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
            onClick={handleCancelMessagingLinksUpdate}
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
                        disabled={socialMediaLinksMutation.isLoading}
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
                        disabled={socialMediaLinksMutation.isLoading}
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
            onClick={handleSubmit(submitUpdateSocialMediaLinks)}
          >
            {t("util.save")}
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelSocialMedialLinksUpdate}
          >
            {t("util.cancel")}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BasicInfoForms;
