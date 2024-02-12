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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
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

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const registerSchema = z.object({
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
  experience: z.string({
    required_error: i18n.t("util.required.non", {
      field: "Experience",
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

type RegisterInput = z.infer<typeof registerSchema>;

const RegisterUserForm = ({ setIsSuccessful }: any) => {
  const [searchParams] = useSearchParams();

  const refId = searchParams.get("refId");

  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const { data: restCountiesData } = useQuery({
    queryKey: ["rest_countries"],
    queryFn: () => getRestCountries(),
  });

  const chatServices = useMemo(() => ["SKYPE", "WHATSAPP", "TELEGRAM"], []);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

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
        {refId && (
          <input
            type="hidden"
            {...register("referralUserId", {
              required: false,
              value: +refId,
            })}
          />
        )}
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
          <Grid item xs={12} sm={12} lg={12}>
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
                  onChange={(_event, item) => {
                    onChange(item);
                  }}
                  value={restCountiesData?.find((c: any) => c === value)}
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
                        marginTop: "0px !important",
                        marginBottom: "0px",
                        padding: "0px !important",
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
            <CustomFormLabel htmlFor="chatServiceUsername">
              {t("login.usernameLabel")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="chatServiceUsername"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.chatServiceUsername !== undefined}
                  helperText={errors.chatServiceUsername?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="chatServiceUsername"
                  {...field}
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

          <Box>
            <FormControl component="fieldset">
              <CustomFormLabel component="legend">Experience</CustomFormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="experience"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="SUPER_AFFILIATE"
                      control={<Radio />}
                      label="Supper affiliate(more than 3 years)"
                    />
                    <FormControlLabel
                      value="EXPERIENCED"
                      control={<Radio />}
                      label="Experienced(1-3 years)"
                    />
                    <FormControlLabel
                      value="NO_EXPERIENCE"
                      control={<Radio />}
                      label="I don't have experience yet."
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Box>
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

export default RegisterUserForm;
