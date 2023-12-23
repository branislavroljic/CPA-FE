import { Grid, Button, Stack, Autocomplete, TextField } from "@mui/material";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getRestCountriesEurope } from "@api/external/restCounties";
import { Order, orderProduct } from "@api/product/product";
import orderSchema from "./orderSchema";
import { useParams } from "react-router-dom";

const OrderForm = () => {
  const { user } = useAuthStore((state) => state);
  const params = useParams();

  const { data: restCountiesData, isLoading: isLoadingRestCountries } =
    useQuery({
      queryKey: ["rest_countries"],
      queryFn: () => getRestCountriesEurope(),
    });

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<Order>({
    resolver: zodResolver(orderSchema),
  });

  const handleCancelOrderUpdate = () => {
    reset();
  };

  const orderMutation = useNotifiedMutation({
    mutationFn: orderProduct,
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateOrder = (newItem: Order) => {
    if (isValid) {
      orderMutation.mutate(newItem);
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12} lg={10}>
        <form>
          <Grid container spacing={3} paddingLeft={3}>
            <input
              type="hidden"
              {...register("userId", {
                required: true,
                value: user?.id,
              })}
            />
            <input
              type="hidden"
              {...register("productId", {
                required: true,
                value: params.productId,
              })}
            />
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="name"
            >
              {t("user.name")}
            </CustomFormLabel>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="name"
                  required
                  disabled={orderMutation.isLoading}
                  error={errors.name !== undefined}
                  helperText={errors.name?.message}
                  placeholder={t("user.name")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="country"
            >
              {t("company.country")}
            </CustomFormLabel>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              defaultValue={undefined}
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
                      error={errors.country !== undefined}
                      helperText={errors.country?.message}
                      required
                    />
                  )}
                />
              )}
            />

            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="address"
            >
              {t("company.address")}
            </CustomFormLabel>
            <Controller
              name="address"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <CustomTextField
                  id="address"
                  required
                  disabled={orderMutation.isLoading}
                  error={errors.address !== undefined}
                  helperText={errors.address?.message}
                  placeholder={t("company.address")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />

            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="phoneNumber"
            >
              {t("user.phoneNumber")}
            </CustomFormLabel>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <CustomTextField
                  id="phoneNumber"
                  required
                  disabled={orderMutation.isLoading}
                  error={errors.phoneNumber !== undefined}
                  helperText={errors.phoneNumber?.message}
                  placeholder={t("user.phoneNumber")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="note"
            >
              {t("order.note")}
            </CustomFormLabel>
            <Controller
              name="note"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <CustomTextField
                  id="note"
                  required
                  disabled={orderMutation.isLoading}
                  error={errors.note !== undefined}
                  helperText={errors.note?.message}
                  placeholder={t("order.note")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />

            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="note"
            >
              {t("order.quantity")}
            </CustomFormLabel>
            <Controller
              name="quantity"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <TextField
                  label={t("order.quantity")}
                  type="number"
                  required
                  fullWidth
                  error={errors.quantity !== undefined}
                  helperText={errors.quantity?.message}
                  placeholder={t("order.quantity")}
                  margin="normal"
                  id="amount"
                  autoFocus
                  //   InputProps={{
                  //     startAdornment: (
                  //       <InputAdornment position="start">$</InputAdornment>
                  //     ),
                  //   }}
                  {...field}
                />
              )}
            />
            <CustomFormLabel
              sx={{
                mt: 2,
              }}
              htmlFor="totalPrice"
            >
              {t("order.totalPrice")}
            </CustomFormLabel>
            <Controller
              name="totalPrice"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <CustomTextField
                  id="totalPrice"
                  required
                  disabled={true}
                  error={errors.totalPrice !== undefined}
                  helperText={errors.totalPrice?.message}
                  placeholder={t("order.totalPrice")}
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
        </form>
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
            onClick={handleSubmit(submitUpdateOrder)}
          >
            {t("util.save")}
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelOrderUpdate}
          >
            {t("util.cancel")}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrderForm;
