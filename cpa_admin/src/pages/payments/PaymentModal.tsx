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
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { usePaymentModalStore } from "@stores/paymentStore";
import { zodResolver } from "@hookform/resolvers/zod";
import paymentSchema from "./paymentSchema";
import { Controller, useForm } from "react-hook-form";
import { UpdatePaymentStatus } from "@api/payment/payment";

export default function PaymentModal() {
  const { item, isOpen, closeModal, submitAction } = usePaymentModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<UpdatePaymentStatus>({
    resolver: zodResolver(paymentSchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "payments");
    }
    closeModal();
  };

  const paymentStatuses = useMemo(
    () => ["REQUESTED", "APPROVED", "REJECTED"],
    []
  );

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

  const requestPayment = (newItem: UpdatePaymentStatus) => {
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
            {...register("id", {
              required: true,
              value: item?.id ?? undefined,
            })}
          />
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="status"
              rules={{ required: true }}
              defaultValue={item?.status ?? undefined}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  value={paymentStatuses.find((m) => m === value)}
                  options={paymentStatuses}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Tip"}
                      margin="normal"
                      variant="outlined"
                      error={errors.status !== undefined}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              defaultValue={item?.description ?? undefined}
              render={({ field }) => (
                <TextField
                  label={"Opis"}
                  fullWidth
                  multiline
                  maxRows={"infinity"}
                  disabled={mutation.isLoading}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  placeholder={"Opis"}
                  margin="normal"
                  id="description"
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="descriptionEng"
              control={control}
              defaultValue={item?.descriptionEng ?? undefined}
              render={({ field }) => (
                <TextField
                  label={"Opis"}
                  fullWidth
                  multiline
                  maxRows={"infinity"}
                  disabled={mutation.isLoading}
                  error={!!errors.descriptionEng}
                  helperText={errors.descriptionEng?.message}
                  placeholder={"Opis na engleskom"}
                  margin="normal"
                  id="descriptionEng"
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="rejectComment"
              control={control}
              defaultValue={item?.rejectComment ?? undefined}
              render={({ field }) => (
                <TextField
                  label={"Razlog odbijanja"}
                  fullWidth
                  multiline
                  maxRows={"infinity"}
                  disabled={mutation.isLoading}
                  error={!!errors.rejectComment}
                  helperText={errors.rejectComment?.message}
                  placeholder={"Razlog odbijanja"}
                  margin="normal"
                  id="rejectComment"
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="rejectCommentEng"
              control={control}
              defaultValue={item?.rejectCommentEng ?? undefined}
              render={({ field }) => (
                <TextField
                  label={"Opis"}
                  fullWidth
                  multiline
                  maxRows={"infinity"}
                  disabled={mutation.isLoading}
                  error={!!errors.rejectCommentEng}
                  helperText={errors.rejectCommentEng?.message}
                  placeholder={"Opis"}
                  margin="normal"
                  id="rejectCommentEng"
                  {...field}
                />
              )}
            />
          </Grid>
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
