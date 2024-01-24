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
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import queryClient, { invalidateAllQueries } from "../../query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useAuthStore from "@stores/authStore";
import { usePostbackModalStore } from "@stores/postbackStore";
import postbackSchema from "./postbackSchema";
import { Postback } from "@api/user/user";
import { useLoaderData } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

export default function PostbackModal() {
  const { item, isOpen, closeModal, submitAction } = usePostbackModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const { user } = useAuthStore((state) => state);

  const loaderData = useLoaderData() as unknown[];
  const statuses = loaderData[0] as string[];
  const methods = loaderData[1] as string[];
  const levels = (loaderData[2] as string[]) ?? [];
  const products = (loaderData[3] as { id: number; name: string }[]) ?? [];

  const events = useMemo(() => ["REQUESTED", "TRASH", "CANCELLED", "DONE"], []);
  const urlValues = useMemo(
    () => [
      "{event}",
      "{sub_1}",
      "{sub_2}",
      "{sub_3}",
      "{sub_4}",
      "{user_ip}",
      "{landing}",
      "{prelanding}",
      "{time}",
      "{device_type}",
      "{browser_name}",
      "{browser_version}",
      "{os_name}",
      "{os_version}",
      "{payout}",
    ],
    []
  );
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<Postback>({
    resolver: zodResolver(postbackSchema),
  });

  useEffect(() => {
    reset();
    // setDynamicFields([]);
  }, [isOpen, reset, setValue]);

  const urlValue = watch("url");

  const levelValue = watch("level");

  const [dynamicFields, setDynamicFields] = useState<any[]>([]);

  useEffect(() => {
    if (!item?.finalUrl) return;
    const urlParams = new URLSearchParams(new URL(item?.finalUrl).search);

    const initialFields = Array.from(urlParams.entries()).map(
      ([value, type]) => ({
        type,
        value,
        id: uuidv4(),
      })
    );

    setDynamicFields(initialFields.length > 0 ? initialFields : []);
  }, [item?.finalUrl, setValue]);

  useEffect(() => {
    if (!urlValue || !urlValue.length) return;
    const finalUrlParams = dynamicFields
      .filter((field) => field.value && field.type)
      .map((field) => `${field.value}=${field.type}`)
      .join("&");

    const updatedFinalUrl = `${urlValue ?? ""}?${finalUrlParams}`;
    setValue("finalUrl", updatedFinalUrl);
  }, [dynamicFields, setValue, urlValue, item?.finalUrl]);

  const handleAddField = () => {
    setDynamicFields((prevFields) => [
      ...prevFields,
      { value: "", type: "", id: uuidv4() },
    ]);
  };

  const handleDeleteField = (idToDelete: number) => {
    setDynamicFields((prevFields) =>
      prevFields.filter((field) => field.id !== idToDelete)
    );
  };

  const handleFieldChange = (id: number, key: any, newValue: any) => {
    setDynamicFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [key]: newValue } : field
      )
    );
  };

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "postback");
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

  const requestPayment = (newItem: Postback) => {
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
        <Typography variant="subtitle1">{t("postback.addPostback")}</Typography>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Box component="form">
          <input
            type="hidden"
            {...register("userId", {
              required: true,
              value: user?.id ?? undefined,
            })}
          />

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
                label={t("postback.name")}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.name !== undefined}
                helperText={errors.name?.message}
                placeholder={t("postback.name")}
                margin="normal"
                id="name"
                autoFocus
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
                onChange={(event, item) => {
                  onChange(item);
                }}
                value={methods.find((m) => m === value)}
                options={methods}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("postback.method")}
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

          <Controller
            name="url"
            control={control}
            defaultValue={item?.url ?? undefined}
            render={({ field }) => (
              <TextField
                label={t("postback.url")}
                required
                fullWidth
                disabled={mutation.isLoading}
                error={errors.url !== undefined}
                helperText={errors.url?.message}
                placeholder={t("postback.url")}
                margin="normal"
                id="url"
                {...field}
              />
            )}
          />

          <Controller
            name="finalUrl"
            control={control}
            defaultValue={item?.finalUrl ?? undefined}
            render={({ field }) => (
              <TextField
                label={t("postback.finalUrl")}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={true}
                error={errors.finalUrl !== undefined}
                helperText={errors.finalUrl?.message}
                placeholder={t("postback.finalUrl")}
                margin="normal"
                id="finalUrl"
                {...field}
              />
            )}
          />

          <Divider />
          <Typography
            style={{ marginTop: 10, fontWeight: "bold" }}
            variant="subtitle2"
          >
            {t("postback.urlParams")}
          </Typography>

          <Box
            padding={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {/* Dynamic fields */}
            {dynamicFields.map((field) => (
              <Grid container spacing={3} width={"100%"}>
                {/* Value input */}
                <Grid item xs={12} sm={5} lg={5} key={field.id}>
                  <TextField
                    variant="standard"
                    label={t("postback.name")}
                    value={field.value}
                    required
                    onChange={(e) =>
                      handleFieldChange(field.id, "value", e.target.value)
                    }
                    // ... (other props)
                  />
                </Grid>

                {/* Type select */}
                <Grid item xs={12} sm={5} lg={5}>
                  <Autocomplete
                    value={field.type}
                    onChange={(_, newValue) =>
                      handleFieldChange(field.id, "type", newValue)
                    }
                    options={urlValues}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        {...params}
                        label={t("postback.value")}
                        margin="normal"
                        style={{ marginTop: "0px" }}
                        error={errors.event !== undefined}
                        helperText={errors.event?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                {/* Delete button */}
                <Grid item xs={12} sm={2} lg={2}>
                  <IconButton onClick={() => handleDeleteField(field.id)}>
                    <DeleteOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            {/* Add button */}
            <Button
              variant="text"
              onClick={handleAddField}
              style={{ marginTop: 10 }}
            >
              {t("postback.addParam")}
            </Button>
          </Box>

          <Divider />

          <Controller
            control={control}
            name="event"
            rules={{ required: true }}
            defaultValue={item?.event ?? undefined}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item);
                }}
                value={events.find((m) => m === value)}
                options={events}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("postback.event")}
                    margin="normal"
                    variant="outlined"
                    error={errors.event !== undefined}
                    helperText={errors.event?.message}
                    required
                  />
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="level"
            rules={{ required: true }}
            defaultValue={item?.level ?? undefined}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item);
                }}
                value={levels?.find((m) => m === value)}
                options={levels ?? []}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("postback.level")}
                    margin="normal"
                    variant="outlined"
                    error={errors.level !== undefined}
                    helperText={errors.level?.message}
                    required
                  />
                )}
              />
            )}
          />

          {levelValue && levelValue == "SPECIFIC" && (
            <Controller
              control={control}
              name="productId"
              rules={{ required: true }}
              defaultValue={item?.productId ?? undefined}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item?.id);
                  }}
                  value={products.find((p) => p.id === value)}
                  options={products}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("postback.product")}
                      margin="normal"
                      variant="outlined"
                      error={errors.productId !== undefined}
                      helperText={errors.productId?.message}
                      required
                    />
                  )}
                />
              )}
            />
          )}

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
                value={statuses.find((m) => m === value)}
                options={statuses}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("postback.status")}
                    margin="normal"
                    variant="outlined"
                    error={errors.status !== undefined}
                    helperText={errors.status?.message}
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
