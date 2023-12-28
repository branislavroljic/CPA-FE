import {
  ActionFunctionArgs,
  LoaderFunction,
  ParamParseKey,
  Params,
  useLoaderData,
} from "react-router-dom";

// MUI Elements
import { Box, Typography, Chip, Grid, Divider } from "@mui/material";

import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@ui/container/PageContainer";
import ChildCard from "@ui/shared/ChildCard";
import ProductInfo from "./ProductInfo";
import { ProductDetails, getProductDetails } from "@api/product/product";
import queryClient from "../../query-client";
import ProductLinks from "./ProductLinks";

const PathNames = {
  product: "/products/:productId",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.product>>;
}

const productQuery = (productId?: string) => ({
  queryKey: ["product_details", productId],
  queryFn: () => getProductDetails(productId ?? ""),
});

export const productLoader: LoaderFunction = async ({ params }: Args) => {
  const query = productQuery(params.productId);
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

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
  const productDetails = useLoaderData() as ProductDetails;

  return (
    <PageContainer
      title="Product details"
      description="this is product details page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="Product Detail" items={BCrumb} />
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
      >
        <Grid item xs={12} sm={12} lg={6}>
          <ChildCard>
            {/* ------------------------------------------- */}
            {/* Carousel */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3} xs={12} sm={12} lg={12}>
              <Grid item xs={12} sm={12} lg={12}>
                <img
                  src={`http://localhost:9001/api/product/images/${productDetails.image}`}
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
                          color="success"
                        />
                      </Box>

                      {/* ------------------------------------------- */}
                      {/* Categories */}
                      {/* ------------------------------------------- */}
                      <Box display="flex" alignItems="center" mt={1} mb={1}>
                        {productDetails.categories.map((category) => (
                          <Chip label={category.name} size="small" />
                        ))}
                      </Box>
                      <Divider />
                      {/* ------------------------------------------- */}
                      {/* Price */}
                      {/* ------------------------------------------- */}
                      <Typography mt={2} variant="h4" fontWeight={600}>
                        {`${productDetails.price} ${productDetails.currency}`}
                      </Typography>
                    </>
                  ) : (
                    "No product"
                  )}
                </Box>
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <ProductInfo product={productDetails} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <ProductLinks product={productDetails} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProductDetailsPage;
