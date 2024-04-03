import {
  Grid,
  Box,
  Card,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { z } from "zod";
import i18n from "../../i18n";
import Logo from "@layout/full/shared/logo/Logo";
import { Controller, useForm } from "react-hook-form";
import { PasswordRecoveryRequest } from "@api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNotificationStore } from "@stores/notificationStore";
import { useState } from "react";
import Banner from "./Banner";

const forgotPasswordSchema = z
  .object({
    mail: z.string().email({
      message: i18n.t("util.invalidFormat", {
        field: i18n.t("user.email"),
      }),
    }),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (!data.mail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mail"],
        message: i18n.t("util.required.male", {
          field: `${i18n.t("login.email")} ${i18n.t("util.or")} ${i18n.t(
            "login.phoneNumber"
          )}`,
        }),
      });
    }
  });

export default function ForgotPasswordPage() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordRecoveryRequest>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // const navigate = useNavigate();

  const recoverPassword = async (request: PasswordRecoveryRequest) => {
    const baseUrl = new URL("forgot_password", import.meta.env.VITE_API_URL);
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      setError("mail", {
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

  return (
    <PageContainer description="this is Forgot Password page">
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
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!isSuccessful ? (
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <Typography
                  color="textSecondary"
                  textAlign="center"
                  variant="subtitle2"
                  fontWeight="400"
                >
                  {t("login.recoverPasswordMessage")}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit(recoverPassword)}
                  // sx={{ mt: 1 }}
                >
                  <Stack mt={4}>
                    <Box>
                      <CustomFormLabel htmlFor="email">
                        {t("login.email")}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="mail"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.mail !== undefined}
                            helperText={errors.mail?.message}
                            variant="outlined"
                            fullWidth
                            id="mail"
                            autoComplete="mail"
                            autoFocus
                            {...field}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <Stack mt={2} spacing={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      {t("login.recoverPassword")}
                    </Button>
                    <Button
                      color="primary"
                      size="large"
                      fullWidth
                      component={Link}
                      to="/login"
                    >
                      {t("login.backToLogin")}
                    </Button>
                  </Stack>
                </Box>
              </Card>
            ) : (
              <Banner
                title={t("login.checkYourEmail")}
                subtitle={t("login.checkYourEmailForgorPassword")}
                hasImage={false}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
