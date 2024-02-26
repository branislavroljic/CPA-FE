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
import schema from "./schema";
import { PaymentSettings, createPaymentSetting } from "@api/payment/settings";
import { useQuery } from "@tanstack/react-query";
import { getPaymentMethodInfo } from "@api/user/user";
import Spinner from "@ui/view/spinner/Spinner";

interface BasicPaymentInfoFormProps {
  method: string;
  fieldName: string;
}

const BasicPaymentInfoForm: React.FC<BasicPaymentInfoFormProps> = ({
  method,
  fieldName,
}) => {
  const { user } = useAuthStore((state) => state);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["payment_info", method, user?.id],
    queryFn: () => getPaymentMethodInfo(method, user?.id ?? 0),
  });

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<PaymentSettings>({
    resolver: zodResolver(schema),
  });

  const handleCancelCreatePaymentSetting = () => {
    reset();
  };

  const paymentMutation = useNotifiedMutation({
    mutationFn: createPaymentSetting,
    onSuccess: () => refetch(),
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitCreatePaymentSetting = (newItem: PaymentSettings) => {
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
                <input
                  type="hidden"
                  {...register("method", {
                    required: true,
                    value: method,
                  })}
                />
                <CustomFormLabel
                  sx={{
                    mt: 4,
                  }}
                  htmlFor="info"
                >
                  {fieldName}
                </CustomFormLabel>
                <Controller
                  control={control}
                  name="info"
                  defaultValue={data?.info ?? ""}
                  render={({ field }) => (
                    <CustomTextField
                      error={errors.info !== undefined}
                      helperText={errors.info?.message}
                      required
                      fullWidth
                      variant="outlined"
                      type="info"
                      id="info"
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

export default BasicPaymentInfoForm;
