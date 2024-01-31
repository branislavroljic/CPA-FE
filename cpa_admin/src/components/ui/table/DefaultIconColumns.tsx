import { IconButton, Tooltip } from "@mui/material";
import { TFunction } from "i18next";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export interface IconItem {
  id?: number;
}

export function getEditIcon<T extends IconItem>(onClick: (item: T) => void) {
  const editIcon = (
    item: T,
    key: string,
    t: TFunction<"translation", "translation">
  ) => {
    return (
      <>
        <Tooltip arrow title={t("util.edit")}>
          <IconButton
            color="primary"
            onClick={(e) => {
              onClick(item);
              e.stopPropagation();
            }}
          >
            <IconEdit />
          </IconButton>
        </Tooltip>
      </>
    );
  };
  return editIcon;
}

export function getDeleteIcon<T extends IconItem>(
  onClick: (id?: number) => void
) {
  const deleteIcon = (
    item: T,
    key: string,
    t: TFunction<"translation", "translation">
  ) => {
    return (
      <>
        <Tooltip arrow title={t("util.delete")}>
          <IconButton
            color="error"
            onClick={(e) => {
              onClick(item?.id);
              e.stopPropagation();
            }}
          >
            <IconTrash />
          </IconButton>
        </Tooltip>
      </>
    );
  };
  return deleteIcon;
}
