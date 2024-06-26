import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import useAuthStore from "@stores/authStore";
import { USER_KEY } from "@api/auth";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { AuthUser } from "@api/user/user";
import PageContainer from "@ui/container/PageContainer";
import Logo from "@layout/full/shared/logo/Logo";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { useNotificationStore } from "@stores/notificationStore";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import i18n from "../../i18n";
import { GradientCard, GradientTextField } from "@layout/LayoutUnauth";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const loginSchema = z.object({
  username: z
    .string({
      required_error: i18n.t("util.required.non", {
        field: i18n.t("login.usernameLabel"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("login.usernameLabel"),
        num: standardMaxLength,
      }),
    }),
  password: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("login.passwordLabel"),
      }),
    })
    .min(6, {
      message: i18n.t("util.length", {
        field: i18n.t("login.passwordLabel"),
        num: 6,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("login.passwordLabel"),
        num: standardMaxLength,
      }),
    }),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation();
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const loginUser = async (input: LoginInput) => {
    const baseUrl = new URL("auth/signin/admin", import.meta.env.VITE_API_URL);
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      setError("username", {
        message: "",
        type: "server",
      });
      setError("password", {
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

    const loginResponse = (await result.json()) as AuthUser;
    if (input.rememberMe) {
      localStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    setUser(loginResponse);
    navigate("/");
    return;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer description="this is Login page">
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
            <GradientCard
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit(loginUser)}
                  // sx={{ mt: 1 }}
                >
                  <Stack>
                    <Box>
                      <CustomFormLabel htmlFor="username" color="white">
                        {t("login.usernameLabel")}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="username"
                        defaultValue=""
                        render={({ field }) => (
                          <GradientTextField
                            error={errors.username !== undefined}
                            helperText={errors.username?.message}
                            required
                            variant="outlined"
                            fullWidth
                            id="username"
                            autoComplete="username"
                            autoFocus
                            {...field}
                            InputProps={{
                              style: { color: "white" },
                            }}
                          />
                        )}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel htmlFor="password" color="white">
                        {t("login.passwordLabel")}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({ field }) => (
                          <GradientTextField
                            error={errors.password !== undefined}
                            helperText={errors.password?.message}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...field}
                            InputProps={{
                              style: { color: "white" },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <Box marginTop={4}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      {t("login.login")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </GradientCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
