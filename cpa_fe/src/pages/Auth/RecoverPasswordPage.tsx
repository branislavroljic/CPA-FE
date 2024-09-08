import { useState } from "react";
import {
  Grid,
  Box,
  Card,
  Typography,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "@ui/container/PageContainer";
import Logo from "@layout/full/shared/logo/Logo";
import { z } from "zod";
import i18n from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import Banner from "./Banner";
import { VerifyRecoverPasswordRequest } from "@api/auth";
import { useNotificationStore } from "@stores/notificationStore";

// const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const recoverPasswordSchema = z.object({
  apiKey: z.string({
    required_error: i18n.t("util.required.male", {
      field: i18n.t("login.apiKey"),
    }),
  }),
  newPassword: z.string({
    required_error: i18n.t("util.required.female", {
      field: i18n.t("login.passwordLabel"),
    }),
  }),
  // .min(8, {
  //   message: i18n.t("util.length", {
  //     field: i18n.t("login.passwordLabel"),
  //     num: 8,
  //   }),
  // })
  // .max(standardMaxLength, {
  //   message: i18n.t("util.maxLength", {
  //     field: i18n.t("login.passwordLabel"),
  //     num: standardMaxLength,
  //   }),
  // }),
});

export default function RecoverPasswordPage() {
  const [searchParams] = useSearchParams();

  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );
  const [isSuccessful, setIsSuccessful] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<VerifyRecoverPasswordRequest>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const navigate = useNavigate();

  const registerUser = async (input: VerifyRecoverPasswordRequest) => {
    const baseUrl = new URL(
      "forgot_password/verify",
      import.meta.env.VITE_API_URL
    );
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      setError("apiKey", {
        message: "",
        type: "server",
      });
      setError("newPassword", {
        message: "",
        type: "server",
      });
      openNotification({
        isError: true,
        primaryText: i18n.t("util.errorOccurred"),
        secondaryText: (await result.json()).message,
      });
      return;
    }

    setIsSuccessful(true);
    return;
  };

  const { t } = useTranslation();

  const apiKey = searchParams.get("apiKey");

  return (
    <PageContainer description="this is recover password page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!isSuccessful ? (
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <Box component="form" onSubmit={handleSubmit(registerUser)}>
                  {apiKey && (
                    <input
                      type="hidden"
                      {...register("apiKey", {
                        required: false,
                        value: apiKey,
                      })}
                    />
                  )}
                  <Stack mb={3}>
                    <Box>
                      <CustomFormLabel htmlFor="newPassword">
                        {t("login.passwordLabel")}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="newPassword"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.newPassword !== undefined}
                            helperText={errors.newPassword?.message}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            type="newPassword"
                            id="newPassword"
                            {...field}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    style={{ color: "white" }} 
                  >
                    {t("login.recoverPassword")}
                  </Button>
                </Box>
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    {t("login.alreadyHaveAnAccount")}
                  </Typography>
                  <Typography
                    component={Link}
                    to="/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    {t("login.login")}
                  </Typography>
                </Stack>
              </Card>
            ) : (
              <Banner
                title={t("login.passwordChange")}
                subtitle={t("login.successfulPaswordChange")}
                goToText={t("login.goToLogin")}
                onGoToClick={() => navigate("/")}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
