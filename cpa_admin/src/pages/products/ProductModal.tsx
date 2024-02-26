import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import queryClient, { invalidateAllQueries } from "../../query-client";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageFilePicker from "@ui/ImageFilePicker";
import { InputFormData } from "@api/utils";
import { useProductModalStore } from "@stores/productStore";
import { Category } from "@api/category/category";
import { InputProduct } from "@api/product/product";
import { useLoaderData } from "react-router-dom";
import productSchema from "./schema";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ProductModal() {
  const theme = useTheme();
  const { isOpen, item, closeModal, submitAction, shouldClose } =
    useProductModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const types = useMemo(() => ["PUBLIC", "VIP"], []);
  const statuses = useMemo(() => ["ACTIVE", "PAUSED", "PENDING"], []);

  const loaderData = useLoaderData() as unknown[];
  const categories = loaderData[1] as Category[];

  const {
    register,
    handleSubmit,
    reset,
    control,
    // setValue,
    formState: { errors, isValid },
  } = useForm<InputFormData<InputProduct>>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => reset(), [isOpen, reset]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "products");
    }
    closeModal();
  };

  const mutation = useNotifiedMutation({
    mutationFn: submitAction,
    onSuccess: () => {
      if (shouldClose) {
        handleCloseModal(true);
      }
      setHasChanged(true);
      reset();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const saveProduct = (newItem: InputFormData<InputProduct>) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal(hasChanged)}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container direction={"row"} spacing={1}>
            <input
              type="hidden"
              {...register("body.id", {
                required: false,
                value: item?.id ?? undefined,
              })}
            />
            <Grid item xs={12} sm={12}>
              <Controller
                name="image"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field }) => (
                  <ImageFilePicker
                    control={control}
                    // label={'labelica'}
                    disabled={mutation.isLoading}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="body.name"
                control={control}
                defaultValue={item?.name ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Name"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.name}
                    helperText={errors.body?.name?.message}
                    placeholder={"Name"}
                    margin="normal"
                    id="name"
                    autoFocus
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="body.nameEng"
                control={control}
                defaultValue={item?.nameEng ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Name in English"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.nameEng}
                    helperText={errors.body?.nameEng?.message}
                    placeholder={"Name in English"}
                    margin="normal"
                    id="nameEng"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="body.description"
                control={control}
                defaultValue={item?.description ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Description"}
                    fullWidth
                    multiline
                    required
                    maxRows={"infinity"}
                    disabled={mutation.isLoading}
                    error={!!errors.body?.description}
                    helperText={errors.body?.description?.message}
                    placeholder={"Description"}
                    margin="normal"
                    id="description"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="body.descriptionEng"
                control={control}
                defaultValue={item?.descriptionEng ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Description in English"}
                    fullWidth
                    multiline
                    required
                    maxRows={"infinity"}
                    disabled={mutation.isLoading}
                    error={!!errors.body?.descriptionEng}
                    helperText={errors.body?.descriptionEng?.message}
                    placeholder={"Description in English"}
                    margin="normal"
                    id="descriptionEng"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="body.price"
                control={control}
                defaultValue={item?.price ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Price"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.price}
                    helperText={errors.body?.price?.message}
                    placeholder={"Price"}
                    margin="normal"
                    id="discount"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="body.currency"
                control={control}
                defaultValue={item?.currency ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Currency"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.currency}
                    helperText={errors.body?.currency?.message}
                    placeholder={"Currency"}
                    margin="normal"
                    id="currency"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="body.country_code"
                control={control}
                defaultValue={item?.country_code ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Country code"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.country_code}
                    helperText={errors.body?.country_code?.message}
                    placeholder={"Country code"}
                    margin="normal"
                    id="Country code"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="body.payout"
                control={control}
                defaultValue={item?.payout ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Payout"}
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={!!errors.body?.payout}
                    helperText={errors.body?.payout?.message}
                    placeholder={"Payout"}
                    margin="normal"
                    id="payout"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                name="body.limit_per_day"
                control={control}
                defaultValue={item?.limit_per_day ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Limit per day"}
                    type="number"
                    fullWidth
                    required
                    disabled={mutation.isLoading}
                    error={errors.body?.limit_per_day !== undefined}
                    helperText={errors.body?.limit_per_day?.message}
                    placeholder={"Limit per day"}
                    margin="normal"
                    id="limit_per_day"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="body.approveRate"
                control={control}
                defaultValue={item?.approveRate ?? null}
                render={({ field }) => (
                  <TextField
                    label={"Approve rate"}
                    type="number"
                    fullWidth
                    disabled={mutation.isLoading}
                    error={errors.body?.approveRate !== undefined}
                    helperText={errors.body?.approveRate?.message}
                    placeholder={"Approve rate"}
                    margin="normal"
                    id="approveRate"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="body.type"
                defaultValue={item?.type ?? undefined}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    value={types.find((m) => m === value)}
                    options={types}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Type"}
                        margin="normal"
                        variant="outlined"
                        error={errors.body?.type !== undefined}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="body.status"
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
                        label={"Status"}
                        margin="normal"
                        variant="outlined"
                        error={errors.body?.status !== undefined}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="body.categoriesIDs"
                control={control}
                // defaultValue={item?.categories.map((c) => c.id + "") ?? []}
                defaultValue={item?.categories?.map((c) => c.id + "") ?? []}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 540 }}>
                    <InputLabel id="demo-multiple-chip-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value, index) => (
                            <Chip key={index} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {categories.map((category: Category) => (
                        <MenuItem
                          key={category.id}
                          value={category.id}
                          style={{
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
                        >
                          {`(${category.id}) ${category.name}`}
                        </MenuItem>
                      ))}
                    </Select>

                    {errors.body?.categoriesIDs && (
                      <FormHelperText error>
                        {errors.body?.categoriesIDs.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="body.googleDriveLink"
                control={control}
                defaultValue={item?.googleDriveLink ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Google drive link"}
                    fullWidth
                    disabled={mutation.isLoading}
                    error={!!errors.body?.googleDriveLink}
                    helperText={errors.body?.googleDriveLink?.message}
                    placeholder={"Google drive link"}
                    margin="normal"
                    id="googleDriveLink"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="body.landingPagesString"
                control={control}
                defaultValue={item?.landingPagesString ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Landing pages"}
                    fullWidth
                    disabled={mutation.isLoading}
                    error={!!errors.body?.landingPagesString}
                    helperText={errors.body?.landingPagesString?.message}
                    placeholder={"Landing pages(separated by ; )"}
                    margin="normal"
                    id="landingPagesString"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="body.prelandingPagesString"
                control={control}
                defaultValue={item?.prelandingPagesString ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Prelanding pages"}
                    fullWidth
                    disabled={mutation.isLoading}
                    error={!!errors.body?.prelandingPagesString}
                    helperText={errors.body?.prelandingPagesString?.message}
                    placeholder={"Prelanding pages(separated by ; )"}
                    margin="normal"
                    id="prelandingPagesString"
                    {...field}
                  />
                )}
              />
            </Grid>
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
          onClick={handleSubmit(saveProduct)}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
