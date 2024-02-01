import { Grid, Button, Stack } from "@mui/material";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import useAuthStore from "@stores/authStore";
import { InputOrder, ProductDetails, orderProduct } from "@api/product/product";
import orderSchema from "./orderSchema";
import { useEffect } from "react";

const OrderForm = ({ product }: { product: ProductDetails }) => {
  const { user } = useAuthStore((state) => state);

  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<InputOrder>({
    resolver: zodResolver(orderSchema),
  });

  const quantity = watch("quantity");

  useEffect(() => {
    if (quantity !== undefined) {
      const totalPrice = quantity * product.price;
      setValue("totalPrice", totalPrice);
    }
  }, [quantity, product.price, setValue]);

  const handleCancelOrderUpdate = () => {
    reset();
  };

  const orderMutation = useNotifiedMutation({
    mutationFn: orderProduct,
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateOrder = (newItem: InputOrder) => {
    if (isValid) {
      orderMutation.mutate(newItem);
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12} lg={12} padding={2}>
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
                value: product.id,
              })}
            />
            <Grid item xs={12} sm={6} paddingTop={'0px !important'}>
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="name"
              >
                {t("user.firstname")}
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
                    placeholder={t("user.firstname")}
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} paddingTop={'0px !important'}>
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="country"
              >
                {t("company.country")}
              </CustomFormLabel>
              <Controller
                name="country"
                control={control}
                defaultValue={product.country_code}
                render={({ field }) => (
                  <CustomTextField
                    id="country"
                    required
                    disabled={true}
                    error={errors.name !== undefined}
                    helperText={errors.name?.message}
                    placeholder={t("company.country")}
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} paddingTop={'0px !important'}>
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
            </Grid>

            <Grid item xs={12} sm={6} paddingTop={'0px !important'}>
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
            </Grid>

            <Grid item xs={12} sm={6} paddingTop={'0px !important'}>
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
            </Grid>

            <Grid item xs={12} sm={3} paddingTop={'0px !important'}>
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
                  <CustomTextField
                    type="number"
                    fullWidth
                    InputProps={{
                      inputProps: { min: 1, max: product.limit_per_day },
                    }}
                    error={errors.quantity !== undefined}
                    helperText={errors.quantity?.message}
                    placeholder={t("order.quantity")}
                    margin="normal"
                    id="amount"
                    style={{ marginTop: 0 }}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3} paddingTop={'0px !important'}>
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
