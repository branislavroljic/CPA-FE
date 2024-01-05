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
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import ProductSchema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ImageFilePicker from "@ui/ImageFilePicker";
import { InputFormData } from "@api/utils";
import { useProductModalStore } from "@stores/productStore";
import { Category } from "@api/category/category";
import { Product } from "@api/product/product";
import { useLoaderData } from "react-router-dom";

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
  const types = useMemo(() => ["BASIC", "REGULAR", "VIP"], []);

  const loaderData = useLoaderData() as unknown[];
  const categories = loaderData[1] as Category[];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<InputFormData<Product>>({
    resolver: zodResolver(ProductSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    // defaultValues: {
    //   body: {
    //     categoriesIDs: item?.categories.map((c) => c.id + "") ?? [],
    //   },
    // },
  });

  const setDefaultImageValue = async () => {
    if (item?.image) {
      const response = await fetch(
        `http://localhost:9001/api/product/images/${item.image}`
      );
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      setValue("image", file);
    }
  };

  // Call the setDefaultValue function when the component mounts
  useEffect(() => {
    setDefaultImageValue();
  }, []);

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

  const saveProduct = (newItem: InputFormData<Product>) => {
    console.log(newItem);
    if (isValid) {
      mutation.mutate(newItem);
    } else {
      console.log(errors);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal(hasChanged)}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component="form" sx={{ mt: 1 }}>
            <Grid container direction={"row"} spacing={1}>
              <input
                type="hidden"
                {...register("body.id", {
                  required: true,
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
                      label={"Naziv"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.name}
                      helperText={errors.body?.name?.message}
                      placeholder={"Naziv"}
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
                  defaultValue={item?.name ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Naziv na engleskom"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.nameEng}
                      helperText={errors.body?.nameEng?.message}
                      placeholder={"Naziv"}
                      margin="normal"
                      id="nameEng"
                      autoFocus
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
                      label={"Opis"}
                      fullWidth
                      multiline
                      maxRows={"infinity"}
                      disabled={mutation.isLoading}
                      error={!!errors.body?.description}
                      helperText={errors.body?.description?.message}
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
                  name="body.descriptionEng"
                  control={control}
                  defaultValue={item?.descriptionEng ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Opis na engleskom "}
                      fullWidth
                      multiline
                      maxRows={"infinity"}
                      disabled={mutation.isLoading}
                      error={!!errors.body?.descriptionEng}
                      helperText={errors.body?.descriptionEng?.message}
                      placeholder={"Opis na engleskom"}
                      margin="normal"
                      id="descriptionEng"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.price"
                  control={control}
                  defaultValue={item?.price ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Cijena"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.price}
                      helperText={errors.body?.price?.message}
                      placeholder={"Cijena"}
                      margin="normal"
                      id="discount"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.currency"
                  control={control}
                  defaultValue={item?.currency ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Valuta"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.currency}
                      helperText={errors.body?.currency?.message}
                      placeholder={"Valuta"}
                      margin="normal"
                      id="currency"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.payout"
                  control={control}
                  defaultValue={item?.payout ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Isplata"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.payout}
                      helperText={errors.body?.payout?.message}
                      placeholder={"Isplata"}
                      margin="normal"
                      id="payout"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="body.type"
                  rules={{ required: true }}
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
                          label={"Tip"}
                          margin="normal"
                          variant="outlined"
                          error={errors.body?.type !== undefined}
                          required
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.limit_per_day"
                  control={control}
                  defaultValue={item?.limit_per_day ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Dnevni limit"}
                      type="number"
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={errors.body?.limit_per_day !== undefined}
                      helperText={errors.body?.limit_per_day?.message}
                      placeholder={"Dnevni limit"}
                      margin="normal"
                      id="amount"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.country_code"
                  control={control}
                  defaultValue={item?.country_code ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Kod države"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.country_code}
                      helperText={errors.body?.country_code?.message}
                      placeholder={"Kod države"}
                      margin="normal"
                      id="country_code"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="body.categoriesIDs"
                  control={control}
                  // defaultValue={item?.categories.map((c) => c.id + "") ?? []}
                  defaultValue={[]}
                  render={({ field }) => (
                    <FormControl sx={{ minWidth: 540 }}>
                      <InputLabel id="demo-multiple-chip-label">
                        Kategorije
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
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
                    </FormControl>
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
                      label={"Landing stranice"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.landingPagesString}
                      helperText={errors.body?.landingPagesString?.message}
                      placeholder={"Landing stranice(odvojene ; )"}
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
                      label={"Prelanding stranice"}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.prelandingPagesString}
                      helperText={errors.body?.prelandingPagesString?.message}
                      placeholder={"Prelanding stranice(odvojene ; )"}
                      margin="normal"
                      id="prelandingPagesString"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
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
          onClick={() => {
            console.log(errors);
            console.log(isValid);
            handleSubmit(saveProduct);
          }}
        >
          {t("util.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
