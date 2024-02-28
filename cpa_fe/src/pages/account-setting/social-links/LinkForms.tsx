import { CardContent, Grid, Typography, Button, Stack } from "@mui/material";
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
import Spinner from "@ui/view/spinner/Spinner";
import i18n from "../../../i18n";

const LinkForms = () => {
  const { user } = useAuthStore((state) => state);

  const {
    data: socialMediaLinksData,
    isLoading: isSocialMedialLinksLoading,
    refetch: refetchSocialMediaLinks,
  } = useQuery({
    queryKey: ["social_media_links", user?.id, i18n.t],
    queryFn: () => getSocialMediaLinks(user?.id),
  });
  const {
    data: messagingLinksData,
    isLoading: isMessagingLinksLoading,
    refetch: refetchMessagingLinksData,
  } = useQuery({
    queryKey: ["messaging_links", user?.id],
    queryFn: () => getMessagingLinks(user?.id),
  });

  const {
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
    mutationFn: (params: { socialMediaLinks: SocialMediaLinks; id?: number }) =>
      updateSocialMediaLinks(params.socialMediaLinks, params.id),
    onSuccess: () => {
      refetchSocialMediaLinks();
    },
    showSuccessNotification: true,
  });

  const messagingLinksMutation = useNotifiedMutation({
    mutationFn: (params: { messagingLinks: MessagingLinks; id?: number }) =>
      updateMessagingLinks(params.messagingLinks, params.id),
    onSuccess: () => {
      refetchMessagingLinksData();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateSocialMediaLinks = (newItem: SocialMediaLinks) => {
    if (isValidSocialMediaLinks) {
      socialMediaLinksMutation.mutate({
        socialMediaLinks: newItem,
        id: user?.id,
      });
    }
  };

  const submitUpdateMessagingLinks = (newItem: MessagingLinks) => {
    if (isValidMessagingLinks) {
      messagingLinksMutation.mutate({ messagingLinks: newItem, id: user?.id });
    }
  };

  return (
    <Grid container spacing={3} paddingTop={5}>
      {/*  Social media links */}
      {isSocialMedialLinksLoading ? (
        <Spinner></Spinner>
      ) : (
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                {t("links.socialMediaLinksTitle")}
              </Typography>
              <Typography color="textSecondary" mb={3}>
                {t("links.socialMediaLinksDescription")}
              </Typography>
              <form>
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="facebookLink"
                >
                  {t("links.facebookLink")}
                </CustomFormLabel>
                <Controller
                  control={controlSocialMediaLinks}
                  name="facebookLink"
                  defaultValue={socialMediaLinksData?.facebookLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsSocialMediaLinks.facebookLink !== undefined}
                      helperText={errorsSocialMediaLinks.facebookLink?.message}
                      fullWidth
                      variant="outlined"
                      id="facebookLink"
                      {...field}
                    />
                  )}
                />

                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="googleLink"
                >
                  {t("links.googleLink")}
                </CustomFormLabel>
                <Controller
                  control={controlSocialMediaLinks}
                  name="googleLink"
                  defaultValue={socialMediaLinksData?.googleLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsSocialMediaLinks.googleLink !== undefined}
                      helperText={errorsSocialMediaLinks.googleLink?.message}
                      fullWidth
                      variant="outlined"
                      id="googleLink"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="twitterLink"
                >
                  {t("links.twitterLink")}
                </CustomFormLabel>
                <Controller
                  control={controlSocialMediaLinks}
                  name="twitterLink"
                  defaultValue={socialMediaLinksData?.twitterLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsSocialMediaLinks.twitterLink !== undefined}
                      helperText={errorsSocialMediaLinks.twitterLink?.message}
                      fullWidth
                      variant="outlined"
                      id="twitterLink"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="linkedinLink"
                >
                  {t("links.linkedinLink")}
                </CustomFormLabel>
                <Controller
                  control={controlSocialMediaLinks}
                  name="linkedinLink"
                  defaultValue={socialMediaLinksData?.linkedinLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsSocialMediaLinks.linkedinLink !== undefined}
                      helperText={errorsSocialMediaLinks.linkedinLink?.message}
                      fullWidth
                      variant="outlined"
                      id="linkedinLink"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="instagramLink"
                >
                  {t("links.instagramLink")}
                </CustomFormLabel>
                <Controller
                  control={controlSocialMediaLinks}
                  name="instagramLink"
                  defaultValue={
                    socialMediaLinksData?.instagramLink ?? undefined
                  }
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsSocialMediaLinks.instagramLink !== undefined}
                      helperText={errorsSocialMediaLinks.instagramLink?.message}
                      fullWidth
                      variant="outlined"
                      id="instagramLink"
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
              onClick={handleSubmitSocialMediaLinks(
                submitUpdateSocialMediaLinks
              )}
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
      )}
      {/* Messaging links */}
      {isMessagingLinksLoading ? (
        <Spinner></Spinner>
      ) : (
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                {t("links.messagingLinks")}
              </Typography>
              <Typography color="textSecondary" mb={3}>
                {t("links.messagingLinksDescription")}
              </Typography>
              <form>
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="skypeLink"
                >
                  {t("links.skypeLink")}
                </CustomFormLabel>
                <Controller
                  control={controlMessagingLinks}
                  name="skypeLink"
                  defaultValue={messagingLinksData?.skypeLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsMessagingLinks.skypeLink !== undefined}
                      helperText={errorsMessagingLinks.skypeLink?.message}
                      fullWidth
                      variant="outlined"
                      id="skypeLink"
                      {...field}
                    />
                  )}
                />

                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="telegramLink"
                >
                  {t("links.telegramLink")}
                </CustomFormLabel>
                <Controller
                  control={controlMessagingLinks}
                  name="telegramLink"
                  defaultValue={messagingLinksData?.telegramLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsMessagingLinks.telegramLink !== undefined}
                      helperText={errorsMessagingLinks.telegramLink?.message}
                      fullWidth
                      variant="outlined"
                      id="telegramLink"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="whatsappLink"
                >
                  {t("links.whatsappLink")}
                </CustomFormLabel>
                <Controller
                  control={controlMessagingLinks}
                  name="whatsappLink"
                  defaultValue={messagingLinksData?.whatsappLink ?? undefined}
                  render={({ field }) => (
                    <CustomTextField
                      error={errorsMessagingLinks.whatsappLink !== undefined}
                      helperText={errorsMessagingLinks.whatsappLink?.message}
                      fullWidth
                      variant="outlined"
                      id="whatsappLink"
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
              onClick={handleSubmitMessagingLinks(submitUpdateMessagingLinks)}
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
      )}
    </Grid>
  );
};

export default LinkForms;
