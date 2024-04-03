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
import { Country } from "@api/product/product";
import { Category } from "@api/category/category";
import { useMemo } from "react";

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

const ProductFilter = () => {
  const theme = useTheme();
  const loaderData = useLoaderData() as unknown[];
  const countries = loaderData[0] as Country[];
  const categories = loaderData[1] as Category[];
  const productTypes = useMemo(() => ["PUBLIC", "VIP"], []);

  const {
    filter,
    updateFilterCategories,
    updateFilterCountryCode,
    updateFilterProductType,
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
            Type
          </Typography>
          <br />
          <Box p={3} pt={0}>
            <Autocomplete
              onChange={(_event, item) => {
                updateFilterProductType(item ?? undefined);
              }}
              value={filter.type}
              options={productTypes}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Type"}
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Box>
          {/* {productTypes.map((type, index) => {
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
          })} */}
        </Box>

        <Divider></Divider>
        <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            Category
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
        <Typography variant="h6" px={3} mt={3} pb={2}>
          Country
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
                ></CircleFlag>
              );
            })}
          </Stack>
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => resetFilter()} fullWidth>
            Reset filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
