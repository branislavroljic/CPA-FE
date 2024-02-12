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
import {
  WirePaymentSettings,
  createWirePaymentSetting,
} from "@api/payment/settings";
import { useQuery } from "@tanstack/react-query";
import { getWirePaymentMethodInfo } from "@api/user/user";
import Spinner from "@ui/view/spinner/Spinner";
import wireSchema from "./wireSchema";

const WirePaymentInfoForm = () => {
  const { user } = useAuthStore((state) => state);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wire", user?.id],
    queryFn: () => getWirePaymentMethodInfo(user?.id ?? 0),
  });

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<WirePaymentSettings>({
    resolver: zodResolver(wireSchema),
  });

  const handleCancelCreatePaymentSetting = () => {
    reset();
  };

  const paymentMutation = useNotifiedMutation({
    mutationFn: createWirePaymentSetting,
    onSuccess: () => refetch(),
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitCreatePaymentSetting = (newItem: WirePaymentSettings) => {
    if (isValid) {
      paymentMutation.mutate(newItem);
    }
  };

  return (
    <Grid container justifyContent={"center"} paddingTop={5}>
      {/*  Change Password */}
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid item xs={12} lg={6}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                {t("payments.paymentSettingsMinimumAmount", { number: 100 })}
              </Typography>
              <Typography color="textSecondary" mb={3}>
                {t("payments.paymentSettingsDescription")}
              </Typography>
              <form>
                <input
                  type="hidden"
                  {...register("userId", {
                    required: true,
                    value: user?.id ?? undefined,
                  })}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="bankName"
                >
                  {t("payments.bankName")}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="bankName"
                  defaultValue={data?.bankName ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.bankName !== undefined}
                      helperText={errors.bankName?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="bankName"
                      id="bankName"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="accountHolder"
                >
                  {t("payments.accountHolder")}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="accountHolder"
                  defaultValue={data?.accountHolder ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.accountHolder !== undefined}
                      helperText={errors.accountHolder?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="accountHolder"
                      id="accountHolder"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="country"
                >
                  {t("user.country")}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="country"
                  defaultValue={data?.country ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.country !== undefined}
                      helperText={errors.country?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="country"
                      id="country"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="iban"
                >
                  {"IBAN"}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="iban"
                  defaultValue={data?.iban ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.iban !== undefined}
                      helperText={errors.iban?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="iban"
                      id="iban"
                      {...field}
                    />
                  )}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="swift"
                >
                  {"SWIFT"}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="swift"
                  defaultValue={data?.swift ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.swift !== undefined}
                      helperText={errors.swift?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="swift"
                      id="swift"
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
              onClick={handleSubmit(submitCreatePaymentSetting)}
            >
              {t("util.save")}
            </Button>
            <Button
              size="large"
              variant="text"
              color="error"
              onClick={handleCancelCreatePaymentSetting}
            >
              {t("util.cancel")}
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default WirePaymentInfoForm;
