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
  TextField,
  Typography,
} from "@mui/material";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useAuthStore from "@stores/authStore";
import { useDomainModalStore } from "@stores/domainStore";
import { InputDomain } from "@api/domain/domain";
import domainSchema from "./domainSchema";

export default function DomainModal() {
  const { item, isOpen, closeModal, submitAction } = useDomainModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const { user } = useAuthStore((state) => state);

  const methods = useMemo(() => ["TRACKING"], []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<InputDomain>({
    resolver: zodResolver(domainSchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "domains");
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

  const requestPayment = (newItem: InputDomain) => {
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
        <Typography variant="subtitle1">{t("domain.addDomain")}</Typography>
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
            name="domain"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <TextField
                label={t("domain.domain")}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.domain !== undefined}
                helperText={errors.domain?.message}
                placeholder={t("domain.domain")}
                margin="normal"
                id="domain"
                autoFocus
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            defaultValue={item?.type ?? undefined}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item);
                }}
                value={methods.find((m) => m === value)}
                options={methods}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("domain.type")}
                    margin="normal"
                    variant="outlined"
                    error={errors.type !== undefined}
                    helperText={errors.type?.message}
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
