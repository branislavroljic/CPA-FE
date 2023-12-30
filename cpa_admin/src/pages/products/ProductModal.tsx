import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import queryClient, { invalidateAllQueries } from '../../query-client';
import useNotifiedMutation from '@ui/hooks/useNotifiedMutation';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import ProductSchema from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductModalStore } from '@stores/ProductStore';
import {
  InputProduct,
  ProductFormData,
} from '@api/company/Products';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { MuiFileInput } from 'mui-file-input';
import ImageFilePicker from '@ui/ImageFilePicker';
import { InputFormData } from '@api/utils';

export default function ProductModal() {
  const { isOpen, item, closeModal, submitAction, shouldClose } =
    useProductModalStore();
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<InputFormData<InputProduct>>({
    resolver: zodResolver(ProductSchema),
  });

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, 'products');
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            component="form"
            sx={{ mt: 1 }}
          >
            <Grid direction={'row'} container spacing={1}>
              <input
                type="hidden"
                {...register('body.id', {
                  required: true,
                  value: item?.id ?? undefined,
                })}
              />
              <input
                type="hidden"
                {...register('body.companyId', {
                  required: true,
                  value: item?.companyId ?? undefined,
                })}
              />
              <Grid item xs={12} sm={12}>
                <Controller
                  name="image"
                  control={control}
                  defaultValue={
                    item?.imageBytes
                      ? new File(
                          [new Blob([item?.imageBytes])],
                          item.imageName,
                          {
                            type: `image/${item.imageType}`,
                          }
                        )
                      : undefined
                  }
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
                  name="body.title"
                  control={control}
                  defaultValue={item?.title ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={t('Product.title')}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.title}
                      helperText={errors.body?.title?.message}
                      placeholder={t('Product.title')}
                      margin="normal"
                      id="title"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.discount"
                  control={control}
                  defaultValue={item?.discount ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={t('Product.discount')}
                      required
                      fullWidth
                      disabled={mutation.isLoading}
                      error={!!errors.body?.discount}
                      helperText={errors.body?.discount?.message}
                      placeholder={t('Product.discount')}
                      margin="normal"
                      id="discount"
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
                      label={t('Product.description')}
                      required
                      fullWidth
                      multiline
                      rows={2}
                      maxRows={'infinity'}
                      disabled={mutation.isLoading}
                      error={!!errors.body?.description}
                      helperText={errors.body?.description?.message}
                      placeholder={t('Product.description')}
                      margin="normal"
                      id="description"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.startDateTime"
                  control={control}
                  defaultValue={item?.startDateTime}
                  render={({ field: { value, onChange, ...props } }) => (
                    <DateTimePicker
                    sx={{width : "100%"}}
                      label={t('Product.startDateTime')}
                      value={value ? dayjs(value?.toLocaleString()) : undefined}
                      slotProps={{
                        textField: {
                          // fullWidth: fullWidth,
                          variant: 'outlined',
                          error: !!errors.body?.startDateTime,
                          helperText: errors.body?.startDateTime?.message,
                          id: 'startDateTime',
                        },
                      }}
                      onChange={(newValue) => onChange(newValue?.toDate())}
                      {...props}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.endDateTime"
                  control={control}
                  defaultValue={item?.endDateTime}
                  render={({ field: { value, onChange, ...props } }) => (
                    <DateTimePicker
                      sx={{width : "100%"}}
                      label={t('Product.endDateTime')}
                      value={value ? dayjs(value?.toLocaleString()) : undefined}
                      slotProps={{
                        textField: {
                          // fullWidth: fullWidth,
                          variant: 'outlined',
                          error: !!errors.body?.endDateTime,
                          helperText: errors.body?.endDateTime?.message,
                          id: 'endDateTime',
                        },
                      }}
                      onChange={(newValue) => onChange(newValue?.toDate())}
                      {...props}
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
          {t('util.cancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(saveProduct)}
        >
          {t('util.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
