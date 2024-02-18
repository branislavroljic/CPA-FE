import {
  Grid,
  Box,
  Card,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { z } from "zod";
import i18n from "../../i18n";
import Logo from "@layout/full/shared/logo/Logo";
import { Controller, useForm } from "react-hook-form";
import { PasswordRecoveryRequest } from "@api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNotificationStore } from "@stores/notificationStore";

const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email({
        message: i18n.t("util.invalidFormat", {
          field: i18n.t("user.email"),
        }),
      })
      .optional()
      .or(z.literal(""))
      .transform((d) => (d === "" ? undefined : d)),
    phoneNumber: z
      .string()
      .regex(
        new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"),
        {
          message: i18n.t("util.invalidFormat", {
            field: i18n.t("user.phoneNumber"),
          }),
        }
      )
      .optional()
      .or(z.literal(""))
      .transform((d) => (d === "" ? undefined : d)),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (!data.email && !data.phoneNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email", "phoneNumber"],
        message: i18n.t("util.required.male", {
          field: `${i18n.t("login.email")} ${i18n.t("util.or")} ${i18n.t(
            "login.phoneNumber"
          )}`,
        }),
      });
    }
  });

export default function ForgotPasswordPage() {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<PasswordRecoveryRequest>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();

  const recoverPassword = async (request: PasswordRecoveryRequest) => {
    const baseUrl = new URL(
      "auth/recover-password",
      import.meta.env.VITE_API_URL
    );
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      setError("email", {
        message: "",
        type: "server",
      });
      setError("phoneNumber", {
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

    navigate("/recover-password");
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
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          error={errors.email !== undefined}
                          helperText={errors.email?.message}
                          disabled={!!watch("phoneNumber")}
                          variant="outlined"
                          fullWidth
                          id="email"
                          autoComplete="email"
                          autoFocus
                          {...field}
                        />
                      )}
                    />
                  </Box>

                  <Box pt={3}>
                    <Divider>
                      <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                      >
                        {t("util.or")}
                      </Typography>
                    </Divider>
                  </Box>

                  <Box>
                    <CustomFormLabel htmlFor="phoneNumber">
                      {t("login.phoneNumber")}
                    </CustomFormLabel>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          error={errors.phoneNumber !== undefined}
                          helperText={errors.phoneNumber?.message}
                          disabled={!!watch("email")}
                          variant="outlined"
                          fullWidth
                          id="phoneNumber"
                          autoComplete="phoneNumber"
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
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
