import { useParams } from "react-router-dom";

// MUI Elements
import {
  Box,
  Typography,
  Chip,
  Grid,
  Divider,
  Stack,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@ui/container/PageContainer";
import ChildCard from "@ui/shared/ChildCard";
import ProductInfo from "./ProductInfo";
import { getProductDetails } from "@api/product/product";
import ProductLinks from "./ProductLinks";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import { VIPRequest, requestVIP } from "@api/vip/vip";
import { zodResolver } from "@hookform/resolvers/zod";
import vipSchema from "./vipSchema";
import { Controller, useForm } from "react-hook-form";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import { IconBrandGoogleDrive } from "@tabler/icons-react";
import i18n from "../../i18n";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";
import { CircleFlag } from "react-circle-flags";

// const PathNames = {
//   product: "/products/:productId",
// } as const;

// interface Args extends ActionFunctionArgs {
//   params: Params<ParamParseKey<typeof PathNames.product>>;
// }

// const productQuery = (productId?: string) => ({
//   queryKey: ["product_details", productId],
//   queryFn: () => getProductDetails(productId ?? ""),
// });

// export const productLoader: LoaderFunction = async ({ params }: Args) => {
//   const query = productQuery(params.productId);
//   return (
//     queryClient.getQueryData(query.queryKey) ??
//     (await queryClient.fetchQuery(query))
//   );
// };

const BCrumb = [
  {
    to: "/",
    title: "Products",
  },
  {
    title: "Details",
  },
];

const ProductDetailsPage = () => {
  const { t } = useTranslation();
  // const productDetails = useLoaderData() as ProductDetails;
  const { user, setUser } = useAuthStore();

  const { productId } = useParams();
  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["product_details", productId, i18n],
    queryFn: () => getProductDetails(productId ?? ""),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<VIPRequest>({
    resolver: zodResolver(vipSchema),
  });

  const mutation = useNotifiedMutation({
    mutationFn: requestVIP,
    onSuccess: () => {
      reset();
      if (user) setUser({ ...user, enabledVipProducts: "REQUESTED" });
    },
    showSuccessNotification: true,
  });

  const requestVIPSubmit = (newItem: VIPRequest) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <PageContainer title="Klix Lead" description="this is product details page">
      {/* breadcrumb */}
      <Breadcrumb title="Product Detail" items={BCrumb} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
        >
          <Grid item xs={12} sm={12} lg={5}>
            <ChildCard>
              {/* ------------------------------------------- */}
              {/* Carousel */}
              {/* ------------------------------------------- */}
              <Grid container spacing={3}>
                <Chip
                  label={productDetails?.status}
                  style={{ margin: 5 }}
                  size="small"
                  color={
                    productDetails?.status == "ACTIVE" ? "success" : "warning"
                  }
                />
                <Grid item xs={12} sm={12} lg={12}>
                  <img
                    src={`https://api.klixlead.com/api/product/images/${productDetails?.image}`}
                    alt="img"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Box p={2}>
                    {productDetails ? (
                      <>
                        <Box
                          justifyContent={"space-between"}
                          flexDirection={"row"}
                          display={"flex"}
                        >
                          <Typography variant="h6" display={"inline"}>
                            {productDetails.name}
                          </Typography>
                          <Chip
                            label={productDetails.type}
                            size="small"
                            color={
                              productDetails.type == "PUBLIC"
                                ? "default"
                                : "warning"
                            }
                          />
                        </Box>

                        {/* ------------------------------------------- */}
                        {/* Categories */}
                        {/* ------------------------------------------- */}
                        <div style={{ overflowX: "auto", paddingBottom: 15 }}>
                          <Box
                            display="flex"
                            alignItems="center"
                            mt={1}
                            mb={1}
                            gap={1}
                          >
                            {productDetails?.categories?.map(
                              (category, index) => (
                                <Chip
                                  label={category.name}
                                  size="small"
                                  key={"cat_" + index}
                                />
                              )
                            )}
                          </Box>
                        </div>
                        <Divider />
                        {/* ------------------------------------------- */}
                        {/* Price */}
                        {/* ------------------------------------------- */}
                        {/* <Stack
                          direction={"row"}
                          alignItems={"baseline"}
                          justifyContent={"space-between"}
                        >
                          <Typography mt={2} variant="h4" fontWeight={600}>
                            {`${productDetails.price} ${productDetails.currency}`}
                          </Typography>
                          {productDetails.googleDriveLink && (
                            <Tooltip title={t("ui.photo")}>
                              <IconButton
                                onClick={() =>
                                  window.open(
                                    productDetails.googleDriveLink,
                                    "_blank"
                                  )
                                }
                              >
                                <IconBrandGoogleDrive color="orange" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack> */}
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Stack direction="row" alignItems="baseline" gap={4}>
                            <Stack>
                              <Typography
                                variant="overline"
                                color={"lightgray"}
                              >
                                {t("products.country")}
                              </Typography>
                              <Tooltip
                                title={productDetails.country_code.toLowerCase()}
                              >
                                <CircleFlag
                                  countryCode={productDetails.country_code.toLowerCase()}
                                  height="25"
                                />
                              </Tooltip>
                            </Stack>
                            <Stack>
                              <Typography
                                variant="overline"
                                color={"lightgray"}
                              >
                                {t("products.price")}
                              </Typography>
                              <Typography variant="h6">{`${productDetails.price} ${productDetails.currency}`}</Typography>
                            </Stack>
                            <Stack>
                              <Typography
                                variant="overline"
                                color={"lightgray"}
                              >
                                {t("products.payout")}
                              </Typography>
                              <Typography variant="h6">{`$ ${productDetails.payout}`}</Typography>
                            </Stack>
                            <Stack>
                              <Typography
                                variant="overline"
                                color={"lightgray"}
                              >
                                {t("products.paymentModel")}
                              </Typography>
                              <Typography variant="h6">CPA</Typography>
                            </Stack>
                          </Stack>
                          {productDetails.googleDriveLink && (
                            <Tooltip title={t("ui.photo")}>
                              <IconButton
                              style={{marginTop : 10}}
                                onClick={() =>
                                  window.open(
                                    productDetails.googleDriveLink,
                                    "_blank"
                                  )
                                }
                              >
                                <IconBrandGoogleDrive color="orange" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </>
                    ) : (
                      "No product"
                    )}
                  </Box>
                </Grid>
              </Grid>
            </ChildCard>
          </Grid>
          <Grid item xs={12} sm={12} lg={7}>
            <ProductInfo product={productDetails} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            {productDetails?.type == "VIP" &&
            user?.enabledVipProducts == "BLOCKED" ? (
              <Stack spacing={2} alignItems={"center"}>
                <Divider>
                  <Typography variant="h4">
                    {t("products.requestVIPAccess")}
                  </Typography>
                </Divider>

                <Typography
                  variant="body2"
                  fontSize={"medium"}
                  fontStyle={"oblique"}
                  color={"gray"}
                >
                  {t("products.vipAccessDesc")}
                </Typography>
                <Box
                  component="form"
                  // onSubmit={handleSubmit(saveCompanyType)}
                  sx={{ mt: 1, width: "100%" }}
                  flex={1}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <input
                    type="hidden"
                    {...register("userId", {
                      required: true,
                      value: user?.id ?? undefined,
                    })}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <TextField
                        label={t("products.description")}
                        required
                        sx={{ width: "50%" }}
                        multiline
                        disabled={mutation.isLoading}
                        error={!!errors?.description}
                        helperText={errors?.description?.message}
                        placeholder={t("products.description")}
                        margin="normal"
                        id="nameEng"
                        {...field}
                      />
                    )}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit(requestVIPSubmit)}
                  >
                    {t("util.send")}
                  </Button>
                </Box>
              </Stack>
            ) : productDetails?.type == "VIP" &&
              user?.enabledVipProducts == "REQUESTED" ? (
              <Stack spacing={3}>
                <Divider>
                  <Typography variant="h4">
                    {t("products.VIPAccessRequested")}
                  </Typography>
                </Divider>

                <Typography
                  variant="body2"
                  fontSize={"medium"}
                  fontStyle={"oblique"}
                  color={"gray"}
                  textAlign={"center"}
                >
                  {t("products.VIPAccessRequestDesc")}
                </Typography>
              </Stack>
            ) : (
              <ProductLinks product={productDetails} />
            )}
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default ProductDetailsPage;
