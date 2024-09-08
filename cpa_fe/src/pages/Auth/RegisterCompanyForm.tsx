import { useMemo, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Autocomplete,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { z } from "zod";
import i18n from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getRestCountries } from "@api/external/restCounties";
import { useQuery } from "@tanstack/react-query";
import { useNotificationStore } from "@stores/notificationStore";
import LoadingButton from "@mui/lab/LoadingButton";
import { GradientTextField } from "@layout/LayoutUnauth";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const registerCompanySchema = z.object({
  name: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.firstname"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.firstname"),
        num: 3,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.firstname"),
        num: standardMaxLength,
      }),
    }),
  surname: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("user.lastname"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("user.lastname"),
        num: 3,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.lastname"),
        num: standardMaxLength,
      }),
    }),
  companyName: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("company.companyName"),
      }),
    })
    .min(1, {
      message: i18n.t("util.length", {
        field: i18n.t("company.companyName"),
        num: 1,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.companyName"),
        num: standardMaxLength,
      }),
    }),
  country: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("user.country"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("user.country"),
        num: standardMaxLength,
      }),
    }),
  companyCity: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("company.city"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.city"),
        num: standardMaxLength,
      }),
    }),
  companyAddress: z
    .string({
      required_error: i18n.t("util.required.female", {
        field: i18n.t("company.address"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.address"),
        num: standardMaxLength,
      }),
    }),
  companyZipCode: z
    .string({
      required_error: i18n.t("util.required.male", {
        field: i18n.t("company.zipcode"),
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t("util.maxLength", {
        field: i18n.t("company.zipcode"),
        num: standardMaxLength,
      }),
    }),
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
  chatService: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Chat service",
    }),
  }),
  chatServiceUsername: z.string({
    required_error: i18n.t("util.required.male", {
      field: "Chat service username",
    }),
  }),
  referralUserId: z.coerce.number().optional(),
});

type RegisterInput = z.infer<typeof registerCompanySchema>;

const RegisterCompanyForm = ({ setIsConfirmMail }: any) => {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { data: restCountiesData } = useQuery({
    queryKey: ["rest_countries"],
    queryFn: () => getRestCountries(),
  });

  const chatServices = useMemo(() => ["SKYPE", "WHATSAPP", "TELEGRAM"], []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerCompanySchema) });

  const registerUser = async (input: RegisterInput) => {
    setLoading(true);
    const baseUrl = new URL("auth/signup", import.meta.env.VITE_API_URL);
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
      openNotification({
        isError: true,
        primaryText: i18n.t("util.errorOccurred"),
        secondaryText: (await result.json()).message,
      });
      return;
    }

    setIsConfirmMail(true);
    return;
  };

  const { t } = useTranslation();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(registerUser)}>
        <Grid container direction={"row"} spacing={1}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="name" color="white">
              {t("user.firstname")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <GradientTextField
                  error={errors.name !== undefined}
                  helperText={errors.name?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="name"
                  autoFocus
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="surname" color="white">
              {t("user.lastname")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="surname"
              defaultValue=""
              render={({ field }) => (
                <GradientTextField
                  error={errors.surname !== undefined}
                  helperText={errors.surname?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="surname"
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="companyName"
              color="white"
            >
              {t("company.companyName")}
            </CustomFormLabel>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <GradientTextField
                  sx={{
                    marginTop: "0px",
                  }}
                  id="companyName"
                  required
                  error={errors.companyName !== undefined}
                  helperText={errors.companyName?.message}
                  variant="outlined"
                  fullWidth
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel
              htmlFor="country"
              sx={{ marginTop: "0px" }}
              color="white"
            >
              {t("company.country")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  fullWidth
                  onChange={(_event, item) => {
                    onChange(item);
                  }}
                  value={restCountiesData?.find((c: any) => c === value)}
                  options={restCountiesData ?? []}
                  getOptionLabel={(option) => `${option}`}
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{ backgroundColor: "black", color: "white" }}
                    />
                  )}
                  renderInput={(params) => (
                    <GradientTextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      sx={{
                        marginTop: "0px !important",
                        marginBottom: "0px",
                        padding: "0px !important",
                        "& .MuiInputBase-root": { height: "45px" },
                        "& input": { color: "white" },
                      }}
                      error={errors.country !== undefined}
                      helperText={errors.country?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="address"
              color="white"
            >
              {t("company.address")}
            </CustomFormLabel>
            <Controller
              name="companyAddress"
              control={control}
              render={({ field }) => (
                <GradientTextField
                  id="address"
                  required
                  error={errors.companyAddress !== undefined}
                  helperText={errors.companyAddress?.message}
                  variant="outlined"
                  fullWidth
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="city"
              color="white"
            >
              {t("company.city")}
            </CustomFormLabel>
            <Controller
              name="companyCity"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <GradientTextField
                  id="city"
                  required
                  error={errors.companyCity !== undefined}
                  helperText={errors.companyCity?.message}
                  variant="outlined"
                  fullWidth
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel
              sx={{
                mt: 0,
              }}
              htmlFor="address"
              color="white"
            >
              {t("company.zipcode")}
            </CustomFormLabel>
            <Controller
              name="companyZipCode"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <GradientTextField
                  id="zipcode"
                  required
                  error={errors.companyZipCode !== undefined}
                  helperText={errors.companyZipCode?.message}
                  variant="outlined"
                  fullWidth
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel
              htmlFor="chatService"
              sx={{ marginTop: "0px" }}
              color="white"
            >
              Chat service
            </CustomFormLabel>
            <Controller
              control={control}
              name="chatService"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(_event, item) => {
                    onChange(item);
                  }}
                  value={chatServices.find((m) => m === value)}
                  options={chatServices}
                  getOptionLabel={(option) => option}
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{ backgroundColor: "black", color: "white" }}
                    />
                  )}
                  renderInput={(params) => (
                    <GradientTextField
                      {...params}
                      sx={{
                        marginTop: "5px !important",
                        marginBottom: "0px",
                        padding: "0px !important",
                        "& .MuiInputBase-root": { height: "45px" },
                        "& input": { color: "white" },
                      }}
                      margin="normal"
                      variant="outlined"
                      error={errors.chatService !== undefined}
                      helperText={errors.chatService?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="chatServiceUsername" color="white">
              {t("login.usernameLabel")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="chatServiceUsername"
              defaultValue=""
              render={({ field }) => (
                <GradientTextField
                  error={errors.chatServiceUsername !== undefined}
                  helperText={errors.chatServiceUsername?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="chatServiceUsername"
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormLabel htmlFor="email" color="white">
              {t("user.email")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <GradientTextField
                  sx={{ marginTop: "0px" }}
                  error={errors.email !== undefined}
                  helperText={errors.email?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="email"
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
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
                  {...field}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="password" color="white">
              {t("login.passwordLabel")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <GradientTextField
                  sx={{ marginTop: "0px" }}
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
          </Grid>
        </Grid>

        <LoadingButton
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          loading={loading}
          style={{ color: "white" }}
          sx={{ marginTop: "20px" }}
        >
          {t("login.register")}
        </LoadingButton>
      </Box>
      <Stack direction="row" spacing={1} mt={2} justifyContent="center">
        <Typography variant="h6" fontWeight="400" color="white">
          {t("login.alreadyHaveAnAccount")}
        </Typography>
        <Typography
          component={Link}
          to="/login"
          fontWeight="500"
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "#3A75FC",
          }}
        >
          {t("login.login")}
        </Typography>
      </Stack>
    </>
  );
};

export default RegisterCompanyForm;
