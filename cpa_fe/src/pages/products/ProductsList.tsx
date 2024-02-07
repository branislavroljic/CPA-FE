import {
  Box,
  Grid,
  Stack,
  CardContent,
  useMediaQuery,
  Typography,
  Fab,
  Theme,
  Chip,
  Divider,
} from "@mui/material";
import { IconMenu2 } from "@tabler/icons-react";
import BlankCard from "@ui/shared/BlankCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PageRequest } from "@api/utils";
import { Product, getProducts } from "@api/product/product";
import { useProductFilterStore } from "@stores/productStore";

import FlatList from "flatlist-react";
import { CircleFlag } from "react-circle-flags";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList = ({ onClick }: Props) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { filter } = useProductFilterStore();
  const { t } = useTranslation();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["products", filter],
    async ({ pageParam = 0 }) => {
      const pageRequest = {
        page: pageParam,
        size: 10,
      } as PageRequest;

      const data = await getProducts(pageRequest, filter);

      return { data, pageParam };
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.rows.length == 0) return undefined;

        return lastPage.pageParam + 1;
      },
      onError: (error: Error) => console.log(error),
      staleTime: 1000 * 60 * 60,
    }
  );

  const renderItem = (product: Product) => (
    <Grid
      item
      xs={12}
      lg={6}
      md={6}
      sm={6}
      display="flex"
      alignItems="stretch"
      key={product.id}
    >
      <BlankCard className="hoverCard">
        <Typography component={Link} to={`${product.id}`}>
          <img
            src={`https://api.klixlead.com/api/product/images/${product.image}`}
            alt="img"
            width="100%"
          />
        </Typography>
        <CardContent sx={{ p: 3, pt: 2 }}>
          <Box
            justifyContent={"space-between"}
            flexDirection={"row"}
            display={"flex"}
          >
            <Typography
              variant="h6"
              display={"inline"}
              component={Link}
              to={`${product.id}`}
            >
              {product.name}
            </Typography>
            <Chip label={product.type} size="small" color="success" />
          </Box>
          <Stack mt={1} direction="row" alignItems="center" gap={1}>
            {product.categories.map((category) => (
              <Chip
                label={category.name}
                size="small"
                color={
                  category.color && category.color.length
                    ? (category.color as
                        | "default"
                        | "primary"
                        | "secondary"
                        | "error"
                        | "success"
                        | "info"
                        | "warning"
                        | undefined)
                    : "primary"
                }
              />
            ))}
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Stack gap={0}>
              <Typography variant="overline">
                {t("products.approveRate")}
              </Typography>
              <Typography color="textPrimary" mt={-0.5}>
                {`${product.approve_rate ?? 0} %`}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="overline">
                {t("products.earnPerClick")}
              </Typography>
              <Typography color="textPrimary" mt={-0.5}>
                {`${product.earn_per_click ?? 0} ${product.currency}`}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            display={"flex"}
            flexWrap={"wrap-reverse"}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.country")}
              </Typography>
              <CircleFlag
                countryCode={product.country_code.toLowerCase()}
                height="25"
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={4}>
              <Stack>
                <Typography variant="overline" color={"lightgray"}>
                  {t("products.price")}
                </Typography>
                <Typography variant="h6">{`${product.price} ${product.currency}`}</Typography>
              </Stack>
              <Stack>
                <Typography variant="overline" color={"lightgray"}>
                  {t("products.payout")}
                </Typography>
                <Typography variant="h6">{`${product.payout} ${product.currency}`}</Typography>
              </Stack>
              <Stack>
                <Typography variant="overline" color={"lightgray"}>
                  {t("products.limit")}
                </Typography>
                <Typography variant="h6">{`${product.limit_per_day}/day`}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </BlankCard>
    </Grid>
  );

  const renderEmptyList = () => (
    <Grid item xs={12} lg={12} md={12} sm={12}>
      <Box textAlign="center" mt={6}>
        {/* <img src={emptyCart} alt="cart" width="200px" /> */}
        <Typography variant="h2">There is no Product</Typography>
        <Typography variant="h6" mb={3}>
          The Product you are searching is no longer available.
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">{t("products.title")}</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        {/* <Box>
          <ProductSearch />
        </Box> */}
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        <>
          <FlatList
            list={data?.pages?.flatMap((page) => page.data.rows) ?? []}
            renderItem={renderItem}
            renderWhenEmpty={renderEmptyList}
            hasMoreItems={hasNextPage}
            loadMoreItems={fetchNextPage}
            paginationLoadingIndicator={
              <div style={{ background: "#090" }}>Getting more items...</div>
            }
          />
        </>
      </Grid>
    </Box>
  );
};

export default ProductList;
