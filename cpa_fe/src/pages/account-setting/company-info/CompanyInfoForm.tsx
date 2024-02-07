import {
  CardContent,
  Grid,
  Typography,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

// images
import BlankCard from "@ui/shared/BlankCard";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import {
  CompanyInfo,
  getCompanyInfo,
  updateCompanyInfo,
} from "@api/user/userSettings";
import Spinner from "@ui/view/spinner/Spinner";
import { getRestCountries } from "@api/external/restCounties";
import companyInfoSchema from "./companyInfoSchema";

const CompanyInfoForm = () => {
  const { user } = useAuthStore((state) => state);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["company_info", user?.id],
    queryFn: () => getCompanyInfo(user?.id),
  });

  const { data: restCountiesData, isLoading: isLoadingRestCountries } =
    useQuery({
      queryKey: ["rest_countries"],
      queryFn: () => getRestCountries(),
    });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<CompanyInfo>({
    resolver: zodResolver(companyInfoSchema),
  });

  const handleCancelCompanyInfoUpdate = () => {
    reset();
  };

  const companyInfoMutation = useNotifiedMutation({
    mutationFn: (params: { companyInfo: CompanyInfo; id?: number }) =>
      updateCompanyInfo(params.companyInfo, params.id),
    onSuccess: () => {
      refetch();
    },
    showSuccessNotification: true,
  });

  const { t } = useTranslation();

  const submitUpdateCompanyInfo = (newItem: CompanyInfo) => {
    if (isValid) {
      companyInfoMutation.mutate({ companyInfo: newItem, id: user?.id });
    }
  };

  return (
    <Grid container justifyContent={"center"} paddingTop={5}>
      {isLoading || isLoadingRestCountries ? (
        <Spinner></Spinner>
      ) : (
        <Grid item xs={12} lg={7}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                {t("company.companyInfoTitle")}
              </Typography>
              <Typography color="textSecondary" mb={3}>
                {t("company.companyInfoDescription")}
              </Typography>
              <form>
                <Grid container spacing={3} paddingLeft={3}>
                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="companyName"
                  >
                    {t("company.companyName")}
                  </CustomFormLabel>
                  <Controller
                    name="companyName"
                    control={control}
                    defaultValue={data?.companyName ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="companyName"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.companyName !== undefined}
                        helperText={errors.companyName?.message}
                        placeholder={t("company.companyName")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="country"
                  >
                    {t("company.country")}
                  </CustomFormLabel>
                  <Controller
                    control={control}
                    name="country"
                    rules={{ required: true }}
                    defaultValue={data?.country ?? undefined}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        fullWidth
                        onChange={(_event, item) => {
                          onChange(item);
                        }}
                        value={restCountiesData?.find((c) => c === value)}
                        options={restCountiesData ?? []}
                        getOptionLabel={(option) => `${option}`}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            variant="outlined"
                            error={errors.country !== undefined}
                            helperText={errors.country?.message}
                            required
                          />
                        )}
                      />
                    )}
                  />
                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="city"
                  >
                    {t("company.city")}
                  </CustomFormLabel>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={data?.city ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="city"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.city !== undefined}
                        helperText={errors.city?.message}
                        placeholder={t("company.city")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="address"
                  >
                    {t("company.address")}
                  </CustomFormLabel>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue={data?.address ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="address"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.address !== undefined}
                        helperText={errors.address?.message}
                        placeholder={t("company.address")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="address"
                  >
                    {t("company.zipcode")}
                  </CustomFormLabel>
                  <Controller
                    name="zipcode"
                    control={control}
                    defaultValue={data?.zipcode ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="zipcode"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.zipcode !== undefined}
                        helperText={errors.zipcode?.message}
                        placeholder={t("company.zipcode")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="companyEmail"
                  >
                    {t("company.companyEmail")}
                  </CustomFormLabel>
                  <Controller
                    name="companyEmail"
                    control={control}
                    defaultValue={data?.companyEmail ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="companyEmail"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.companyEmail !== undefined}
                        helperText={errors.companyEmail?.message}
                        placeholder={t("company.companyEmail")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />

                  <CustomFormLabel
                    sx={{
                      mt: 2,
                    }}
                    htmlFor="tex"
                  >
                    {t("company.tax")}
                  </CustomFormLabel>
                  <Controller
                    name="tex"
                    control={control}
                    defaultValue={data?.tex ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="tex"
                        required
                        disabled={companyInfoMutation.isLoading}
                        error={errors.tex !== undefined}
                        helperText={errors.tex?.message}
                        placeholder={t("company.tax")}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </form>
            </CardContent>
          </BlankCard>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end" }}
            mt={2}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit(submitUpdateCompanyInfo)}
            >
              {t("util.save")}
            </Button>
            <Button
              size="large"
              variant="text"
              color="error"
              onClick={handleCancelCompanyInfoUpdate}
            >
              {t("util.cancel")}
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default CompanyInfoForm;
