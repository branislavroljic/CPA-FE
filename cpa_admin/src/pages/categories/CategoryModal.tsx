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
import { Category } from "@api/category/category";
import categorySchema from "./categorySchema";
import { useCategoryModalStore } from "@stores/categoryStore";

export default function CategoryModal() {
  const { item, isOpen, closeModal, submitAction } = useCategoryModalStore();
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "categories");
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

  const submitCategory = (newItem: Category) => {
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
        <Typography variant="subtitle1">{"Kategorija"}</Typography>
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
            name="name"
            control={control}
            defaultValue={item?.name}
            render={({ field }) => (
              <TextField
                label={"Naziv"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.name !== undefined}
                helperText={errors.name?.message}
                placeholder={"Naziv"}
                margin="normal"
                id="name"
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="nameEng"
            control={control}
            defaultValue={item?.nameEng}
            render={({ field }) => (
              <TextField
                label={"Naziv na engleskom"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.nameEng !== undefined}
                helperText={errors.nameEng?.message}
                placeholder={"Naziv na engleskom"}
                margin="normal"
                id="nameEng"
                {...field}
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={item?.color}
            render={({ field }) => (
              <TextField
                label={"Boja"}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.color !== undefined}
                helperText={errors.color?.message}
                placeholder={"Boja"}
                margin="normal"
                id="color"
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
          onClick={handleSubmit(submitCategory)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
