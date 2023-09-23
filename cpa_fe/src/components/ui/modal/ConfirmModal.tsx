import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ConfirmModalProps {
  title: string;
  content: string;
  Icon: React.ElementType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  primaryAction?: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  title,
  content,
  Icon,
  isOpen,
  setIsOpen,
  primaryAction,
  isLoading,
}: ConfirmModalProps) {
  const { t } = useTranslation();

  const handleCloseModal = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>
        <Stack direction={'row'} gap={2}>
          <Icon />
          <Typography variant="h4">{title}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button color="error" variant='contained' onClick={handleCloseModal} disabled={isLoading}>
          {t('util.cancel')}
        </Button>
        <Button color="primary"  variant='contained' onClick={primaryAction} disabled={isLoading}>
          {t('util.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
