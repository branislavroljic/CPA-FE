import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

// MUI Elements
import { Box, Typography, Chip, useTheme, Grid } from "@mui/material";

import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import PageContainer from "@ui/container/PageContainer";
import ChildCard from "@ui/shared/ChildCard";
import ProductInfo from "./ProductInfo";
import { ProductDetails } from "@api/product/product";

const BCrumb = [
  {
    to: "/",
    title: "Products",
  },
  {
    title: "Details",
  },
];

const ProductDetails = () => {
  const theme = useTheme();

  const  product = useLoaderData() as ProductDetails;

  // Get Product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            {/* ------------------------------------------- */}
            {/* Carousel */}
            {/* ------------------------------------------- */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <img src={product.image} alt={product.name} loading="lazy" />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <Box p={2}>
                  {product ? (
                    <>
                      <Box display="flex" alignItems="center">
                        {/* ------------------------------------------- */}
                        {/* Badge and category */}
                        {/* ------------------------------------------- */}
                        <Chip label="In Stock" color="success" size="small" />
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          ml={1}
                          textTransform="capitalize"
                        >
                          {product.category}
                        </Typography>
                      </Box>
                      {/* ------------------------------------------- */}
                      {/* Title and description */}
                      {/* ------------------------------------------- */}
                      <Typography fontWeight="600" variant="h4" mt={1}>
                        {product.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        mt={1}
                        color={theme.palette.text.secondary}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ex arcu, tincidunt bibendum felis.
                      </Typography>
                      {/* ------------------------------------------- */}
                      {/* Price */}
                      {/* ------------------------------------------- */}
                      <Typography mt={2} variant="h4" fontWeight={600}>
                        <Box
                          component={"small"}
                          color={theme.palette.text.secondary}
                          sx={{ textDecoration: "line-through" }}
                        >
                          ${product.salesPrice}
                        </Box>{" "}
                        ${product.price}
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
        <Grid item xs={12} sm={12} lg={12}>
          <ProductInfo product={product} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProductDetails;
