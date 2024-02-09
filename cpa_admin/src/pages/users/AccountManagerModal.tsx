import { useEffect, useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { AccountManager } from "@api/user/user";
import accountManagerSchema from "./accountManagerSchema";
import { useAccountManagerModalStore } from "@stores/accountManagerStore";
import { useLoaderData } from "react-router-dom";
import { z } from "zod";

export default function AccountManagerModal() {
  const { item, isOpen, closeModal, submitAction } =
    useAccountManagerModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const loaderData = useLoaderData() as any[];
  const accountManagers = (loaderData[0] as AccountManager[]) ?? [];

  type ChangeAccountManagerInput = z.infer<typeof accountManagerSchema>;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ChangeAccountManagerInput>({
    resolver: zodResolver(accountManagerSchema),
  });

  useEffect(() => reset(), [isOpen, reset]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "users");
    }
    closeModal();
  };

  const mutation = useNotifiedMutation({
    mutationFn: (params: { id: number; accountManagerId: number }) =>
      submitAction ? submitAction(params.id, params.accountManagerId) : null,
    onSuccess: () => {
      handleCloseModal(true);
      setHasChanged(true);
      reset();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitAccountManager = (
    changeManagerInput: ChangeAccountManagerInput
  ) => {
    if (isValid && item?.id) {
      mutation.mutate({
        id: item?.id,
        accountManagerId: changeManagerInput.accountManagerId,
      });
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
        <Typography variant="subtitle1">Set Account Manager</Typography>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="accountManagerId"
              rules={{ required: true }}
              defaultValue={item?.accountManagerId}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(_event, item) => {
                    onChange(item?.id);
                  }}
                  value={accountManagers.find((m) => m.id === value)}
                  options={accountManagers}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Account manager"}
                      margin="normal"
                      variant="outlined"
                      error={errors.accountManagerId !== undefined}
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
          onClick={handleSubmit(submitAccountManager)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
