import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { TFunction } from 'i18next';
import { Status } from '@api/utils';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export interface IconItem {
  id: number;
  status: Status;
}

export function getEditIcon<T extends IconItem>(onClick: (item: T) => void) {
  const editIcon = (
    item: T,
    key: string,
    t: TFunction<'translation', undefined, 'translation'>
  ) => {
    return (
      <>
        {item.status != 'DELETED' && (
          <Tooltip arrow title={t('util.edit')}>
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
        )}
      </>
    );
  };
  return editIcon;
}

export function getDeleteOrRestoreIcon<T extends IconItem>(
  onRestoreClick: (id: number) => void,
  onDeleteClick: (id: number) => void
) {
  const deleteOrRestoreIcon = (
    item: T,
    key: string,
    t: TFunction<'translation', undefined, 'translation'>
  ) => (
    <>
      {item.status != 'DELETED' ? (
        <Tooltip arrow title={t('util.delete')}>
          <IconButton
            color="error"
            onClick={(e) => {
              onDeleteClick(item.id);
              e.stopPropagation();
            }}
          >
            <IconTrash />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title={t('util.restore')}>
          <IconButton
            color="success"
            onClick={(e) => {
              onRestoreClick(item.id);
              e.stopPropagation();
            }}
          >
            <RestoreIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
  return deleteOrRestoreIcon;
}

// function getDefaultAdditionalColumns<T extends IconItem>(
//   onEditClick: (item: T) => void,
//   onDeleteClick: (id: string) => void,
//   onRestoreClick: (id: string) => void
// ) {
//   const editIcon = getEditIcon<T>(onEditClick);
//   const deleteOrRestoreIcon = getDeleteOrRestoreIcon<T>(
//     onRestoreClick,
//     onDeleteClick
//   );
//   return [
//     { header: '', cell: editIcon },
//     { header: '', cell: deleteOrRestoreIcon },
//   ] as AdditionalColumn<T>[];
// }

// export default getDefaultAdditionalColumns;
