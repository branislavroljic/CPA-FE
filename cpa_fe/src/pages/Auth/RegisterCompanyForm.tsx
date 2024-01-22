import { useMemo, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";
import { z } from "zod";
import i18n from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { useNotificationStore } from "@stores/notificationStore";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getRestCountriesEurope } from "@api/external/restCounties";
import { useQuery } from "@tanstack/react-query";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";

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
  city: z
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
  address: z
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
  zipcode: z
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
  referralUserId: z.coerce.number().optional(),
});

type RegisterInput = z.infer<typeof registerCompanySchema>;

const RegisterCompanyForm = ({ setIsSuccessful }: any) => {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const { data: restCountiesData } = useQuery({
    queryKey: ["rest_countries"],
    queryFn: () => getRestCountriesEurope(),
  });

  const chatServices = useMemo(() => ["SKYPE", "WHATSAPP", "TELEGRAM"], []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerCompanySchema) });

  const registerUser = async (input: RegisterInput) => {
    const baseUrl = new URL("auth/signup", import.meta.env.VITE_API_URL);
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      openNotification({
        isError: true,
        primaryText: i18n.t("util.errorOccurred"),
        secondaryText: await result.text(),
      });
      return;
    }

    setIsSuccessful(true);
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
            <CustomFormLabel htmlFor="name">
              {t("user.firstname")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.name !== undefined}
                  helperText={errors.name?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="name"
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="surname">
              {t("user.lastname")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="surname"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.surname !== undefined}
                  helperText={errors.surname?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="surname"
                  {...field}
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
            >
              {t("company.companyName")}
            </CustomFormLabel>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  sx={{
                    marginTop: "0px",
                  }}
                  id="companyName"
                  required
                  error={errors.companyName !== undefined}
                  helperText={errors.companyName?.message}
                  placeholder={t("company.companyName")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="country" sx={{ marginTop: "0px" }}>
              {t("company.country")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  fullWidth
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={restCountiesData?.find((c) => c === value)}
                  options={restCountiesData ?? []}
                  getOptionLabel={(option) => `${option}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="outlined"
                      sx={{
                        marginTop: "0px",
                        marginBottom: "0px",
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
            >
              {t("company.address")}
            </CustomFormLabel>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  id="address"
                  required
                  error={errors.address !== undefined}
                  helperText={errors.address?.message}
                  placeholder={t("company.address")}
                  variant="outlined"
                  fullWidth
                  {...field}
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
            >
              {t("company.city")}
            </CustomFormLabel>
            <Controller
              name="city"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="city"
                  required
                  error={errors.city !== undefined}
                  helperText={errors.city?.message}
                  placeholder={t("company.city")}
                  variant="outlined"
                  fullWidth
                  {...field}
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
            >
              {t("company.zipcode")}
            </CustomFormLabel>
            <Controller
              name="zipcode"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="zipcode"
                  required
                  error={errors.zipcode !== undefined}
                  helperText={errors.zipcode?.message}
                  placeholder={t("company.zipcode")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="chatService" sx={{ marginTop: "0px" }}>
              Chat service
            </CustomFormLabel>
            <Controller
              control={control}
              name="chatService"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={chatServices.find((m) => m === value)}
                  options={chatServices}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        marginTop: "0px",
                        marginBottom: "0px",
                      }}
                      label={"Chat service"}
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
          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormLabel htmlFor="email">{t("user.email")}</CustomFormLabel>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ marginTop: "0px" }}
                  error={errors.email !== undefined}
                  helperText={errors.email?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="email"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="username">
              {t("login.usernameLabel")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.username !== undefined}
                  helperText={errors.username?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="username"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="password">
              {t("login.passwordLabel")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <TextField
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

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{ marginTop: "20px" }}
        >
          {t("login.register")}
        </Button>
      </Box>
      <Stack direction="row" spacing={1} mt={2}>
        <Typography color="textSecondary" variant="h6" fontWeight="400">
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
    </>
  );
};

export default RegisterCompanyForm;
