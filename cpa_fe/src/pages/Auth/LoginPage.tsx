import { z } from "zod";
import i18n from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import useAuthStore from "@stores/authStore";
import { USER_KEY } from "@api/auth";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "@api/user/user";
import PageContainer from "@ui/container/PageContainer";
import Logo from "@layout/full/shared/logo/Logo";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNotificationStore } from "@stores/notificationStore";

import LoadingButton from "@mui/lab/LoadingButton";
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
  rememberMe: z.boolean(),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const loginUser = async (input: LoginInput) => {
    setLoading(true);
    const baseUrl = new URL("auth/signin", import.meta.env.VITE_API_URL);
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    setLoading(false);
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

    const loginResponse = (await result.json()) as User;
    if (input.rememberMe) {
      localStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    }
    sessionStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    setUser(loginResponse);
    // navigate("/", {
    //   state: {
    //     isVerified: false,
    //   },
    // });
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
              elevation={0}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "450px",
                // borderRadius: "16px",
                // border: "2px solid",
                // borderImageSlice: 1,
                // borderImageSource:
                //   "linear-gradient(180deg, #E3A02B 0%, #3A77F5 100%)",
              }}
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
                            // sx={{
                            //   backgroundImage:
                            //     "linear-gradient(278.24deg, rgba(58, 117, 252, 0.4) 0%, rgba(58, 117, 252, 0) 100%)",
                            // }}
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
                    <Stack
                      justifyContent="space-between"
                      direction="row"
                      alignItems="center"
                      my={2}
                    >
                      <FormControlLabel
                        sx={{ color: "white" }}
                        control={
                          <Checkbox
                            value="remember"
                            {...register("rememberMe")}
                          />
                        }
                        label={t("login.rememberMe")}
                      />
                      {/* <Link
                        href="#"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        {t('login.forgotPassword')}
                      </Link> */}
                      <Typography
                        component={Link}
                        to="/forgot_password"
                        fontWeight="500"
                        sx={{
                          textDecoration: "none",
                          color: "#3A75FC",
                        }}
                      >
                        {t("login.forgotPassword")}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box>
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                      loading={loading}
                    >
                      {t("login.login")}
                    </LoadingButton>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      sx={{ color: "white" }}
                      variant="h6"
                      fontWeight="500"
                    >
                      {t("login.newToBenefit")}
                    </Typography>
                    {/* <Link
                      href="/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      {t('login.createAccount')}
                    </Link> */}
                    <Typography
                      component={Link}
                      to="/register"
                      variant="h6"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "#3A75FC",
                      }}
                    >
                      {t("login.createAccount")}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </GradientCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
