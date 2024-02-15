import { useTheme } from "@mui/material/styles";
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Typography,
  Box,
  Button,
  Stack,
  SelectChangeEvent,
  FormControl,
  Select,
  Chip,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import { IconPremiumRights } from "@tabler/icons-react";
import { useProductFilterStore } from "@stores/productStore";
import { CircleFlag } from "react-circle-flags";
import { useLoaderData } from "react-router-dom";
import { Category, Country } from "@api/product/product";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 240,
    },
  },
};

const ProductFilter = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const loaderData = useLoaderData() as any[];
  const countries = (loaderData[0] as Country[]) ?? [];
  const categories = (loaderData[1] as Category[]) ?? [];
  const productTypes = useMemo(() => ["PUBLIC", "VIP"], []);
  const paymentModels = useMemo(() => ["CPA"], []);

  const {
    filter,
    updateFilterCategories,
    updateFilterCountryCode,
    updateFilterProductType,
    updateFilterPaymentModel,
    resetFilter,
  } = useProductFilterStore();

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof filter.categories>
  ) => {
    const {
      target: { value },
    } = event;
    updateFilterCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Type filter */}
        {/* ------------------------------------------- */}
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            paddingLeft={3}
            paddingTop={1}
          >
            {t("products.byType")}
          </Typography>
          <br />
          {productTypes.map((type, index) => {
            return (
              <ListItemButton
                sx={{ mb: 1, mx: 1 }}
                selected={filter && filter.type === type}
                onClick={() => updateFilterProductType(type)}
                key={index}
              >
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <IconPremiumRights
                    stroke="1.5"
                    size="19"
                    color={type === "PUBLIC" ? "grey" : "yellow"}
                  />
                </ListItemIcon>
                <ListItemText>{type}</ListItemText>
              </ListItemButton>
            );
          })}
        </Box>

        <Divider></Divider>
        <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            {t("products.byCategory")}
          </Typography>
          <br />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={filter.categories ?? []}
              onChange={handleCategoryChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category: Category) => (
                <MenuItem
                  key={category.id}
                  value={category.name}
                  style={{ fontWeight: theme.typography.fontWeightMedium }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider></Divider>
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          {t("products.byCountry")}
        </Typography>
        {/* ------------------------------------------- */}
        {/* Filter By colors */}
        {/* ------------------------------------------- */}
        <Box p={3} pt={0}>
          <Stack direction={"row"} flexWrap="wrap" gap={1}>
            {countries.map((country: Country) => {
              return (
                <CircleFlag
                  countryCode={country?.code?.toLowerCase()}
                  height="25"
                  key={country.name}
                  onClick={() => updateFilterCountryCode(country?.code)}
                  style={{
                    ...(country?.code?.toLowerCase() ==
                    filter.country_code?.toLocaleLowerCase()
                      ? { borderRadius: "30px", border: "3px solid orange" }
                      : {}),
                  }}
                ></CircleFlag>
              );
            })}
          </Stack>
        </Box>
        <Divider></Divider>
        <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
          {t("products.byPaymentModel")}
        </Typography>
        {/* ------------------------------------------- */}
        {/* Filter By colors */}
        {/* ------------------------------------------- */}
        <Box p={3} pt={0}>
          <Autocomplete
            onChange={(_event, item) => {
              updateFilterPaymentModel(item ?? undefined);
            }}
            value={filter.paymentModel}
            options={paymentModels}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("payments.method")}
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => resetFilter()} fullWidth>
            {t("products.resetFilters")}
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
