import { useEffect, useMemo, useState } from "react";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { usePaymentModalStore } from "@stores/paymentStore";
import { zodResolver } from "@hookform/resolvers/zod";
import paymentSchema from "./paymentSchema";
import { Controller, useForm } from "react-hook-form";
import useAuthStore from "@stores/authStore";
import { InputPayment } from "@api/payment/payment";

export default function PaymentModal() {
  const { item, isOpen, closeModal, submitAction } = usePaymentModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const { user } = useAuthStore((state) => state);

  const methods = useMemo(() => ["INVOICE"], []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<InputPayment>({
    resolver: zodResolver(paymentSchema),
  });

  useEffect(() => reset(), [isOpen, reset]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "payments");
    }
    closeModal();
  };

  const mutation = useNotifiedMutation({
    mutationFn: submitAction,
    onSuccess: () => {
      handleCloseModal(true);
      setHasChanged(true);
      reset();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const requestPayment = (newItem: InputPayment) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseModal(hasChanged)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle display={"flex"} gap={1}>
        <Typography variant="subtitle1">
          {t("payments.requestPayment")}
        </Typography>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box
          component="form"
          // onSubmit={handleSubmit(saveCompanyType)}
          sx={{ mt: 1 }}
        >
          <input
            type="hidden"
            {...register("userId", {
              required: true,
              value: user?.id ?? undefined,
            })}
          />

          <Controller
            name="amount"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <TextField
                label={t("payments.amount")}
                type="number"
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.amount !== undefined}
                helperText={errors.amount?.message}
                placeholder={t("payments.amount")}
                margin="normal"
                id="amount"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="method"
            rules={{ required: true }}
            defaultValue={item?.method ?? undefined}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(_event, item) => {
                  onChange(item);
                }}
                value={methods.find((m) => m === value)}
                options={methods}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("payments.method")}
                    margin="normal"
                    variant="outlined"
                    error={errors.method !== undefined}
                    helperText={errors.method?.message}
                    required
                  />
                )}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleCloseModal(hasChanged)}
          disabled={mutation.isLoading}
          variant="contained"
          color="error"
        >
          {t("util.cancel")}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(requestPayment)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
