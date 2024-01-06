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
import { zodResolver } from "@hookform/resolvers/zod";
import OrderSchema from "./schema";
import { Controller, useForm } from "react-hook-form";
import { UpdateOrderStatus } from "@api/order/order";
import { useOrderModalStore } from "@stores/orderStore";

export default function OrderModal() {
  const { item, isOpen, closeModal, submitAction } = useOrderModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<UpdateOrderStatus>({
    resolver: zodResolver(OrderSchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "orders");
    }
    closeModal();
  };

  const OrderStatuses = useMemo(
    () => ["REQUESTED", "TRASH", "CANCELLED", "DONE"],
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

  const changeOrderStatus = (newItem: UpdateOrderStatus) => {
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
          {"Izmijeni status narudžbe"}
        </Typography>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box
          component="form"
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
                  value={OrderStatuses.find((m) => m === value)}
                  options={OrderStatuses}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Status"}
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
          onClick={handleSubmit(changeOrderStatus)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
