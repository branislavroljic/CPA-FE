import { useEffect, useState } from "react";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCustomPayoutModalStore } from "@stores/customPayoutStore";
import { CustomPayout } from "@api/custom-payout/custom-payout";
import customPayoutSchema from "./schema";

export default function CustomPayoutModal() {
  const { item, isOpen, closeModal, submitAction } =
    useCustomPayoutModalStore();
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CustomPayout>({
    resolver: zodResolver(customPayoutSchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "custom_payouts");
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

  const submitCustomPayout = (newItem: CustomPayout) => {
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
        <Typography variant="subtitle1">{"CustomPayout"}</Typography>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <input
            type="hidden"
            {...register("id", {
              required: true,
              value: item?.id ?? undefined,
            })}
          />

          <Controller
            name="payout"
            control={control}
            defaultValue={item?.payout}
            render={({ field }) => (
              <TextField
                label={"Payout"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.payout !== undefined}
                helperText={errors.payout?.message}
                placeholder={"Payout"}
                margin="normal"
                id="payout"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="userId"
            control={control}
            defaultValue={item?.payout}
            render={({ field }) => (
              <TextField
                label={"User ID"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.userId !== undefined}
                helperText={errors.userId?.message}
                placeholder={"User ID"}
                margin="normal"
                id="userId"
                {...field}
              />
            )}
          />
          <Controller
            name="productId"
            control={control}
            defaultValue={item?.productId}
            render={({ field }) => (
              <TextField
                label={"Offer ID"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.productId !== undefined}
                helperText={errors.productId?.message}
                placeholder={"Offer ID"}
                margin="normal"
                id="productId"
                {...field}
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
          onClick={handleSubmit(submitCustomPayout)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
