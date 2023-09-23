import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  CardMedia,
  Tooltip,
  styled,
  Box,
} from '@mui/material';
import i18n from '../../i18n';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Change the background color on hover if desired
  },
  maxWidth: 345,
  borderRadius: 10,
  raised: true,
}));

interface ImageCardProps<T> {
  item: T;
  primaryText: string;
  secondaryText?: string;
  image?: string;
  onEditClick: (item: T) => void;
  onDeleteClick: (item: T) => void;
  onCardClick?: (item: T) => void;
}

function ImageCard<T>({
  item,
  primaryText,
  secondaryText,
  image,
  onEditClick,
  onDeleteClick,
  onCardClick,
}: ImageCardProps<T>) {
  return (
    <StyledCard onClick={(e) => (onCardClick ? onCardClick(item) : undefined)}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {primaryText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {secondaryText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
        <Tooltip arrow title={i18n.t('util.edit')}>
          <IconButton
            color="primary"
            onClick={(e) => {
              onEditClick(item);
              e.stopPropagation();
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title={i18n.t('util.delete')}>
          <IconButton
            color="error"
            onClick={(e) => {
              onDeleteClick(item);
              e.stopPropagation();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
}

export default ImageCard;
