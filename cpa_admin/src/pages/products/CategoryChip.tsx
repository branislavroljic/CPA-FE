import { Chip } from "@mui/material";

const allowedColors = [
  "default",
  "primary",
  "secondary",
  "error",
  "success",
  "info",
  "warning",
];

const getColor = (color: string) => {
  return allowedColors.includes(color) ? color : "primary";
};

const CategoryChip = ({ category }: any) => (
  <Chip label={category.name} size="small" color={getColor(category.color)} />
);

export default CategoryChip;
