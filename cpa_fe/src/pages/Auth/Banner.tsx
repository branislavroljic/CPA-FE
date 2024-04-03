import { CardContent, Typography, Button, Box } from "@mui/material";
import starBg from "/src/assets/images/backgrounds/gold.png";
import BlankCard from "@ui/shared/BlankCard";

export interface BannerProps {
  title: string;
  subtitle?: string;
  goToText?: string;
  hasImage?: boolean;
  onGoToClick?: () => void;
}

const Banner = ({
  title,
  subtitle,
  goToText,
  onGoToClick,
  hasImage = true,
}: BannerProps) => {
  return (
    <BlankCard>
      <CardContent sx={{ p: "30px" }}>
        <Box textAlign="center">
          {hasImage && <img src={starBg} alt="star" width={150} />}

          <Typography variant="h5">{title}</Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
              {subtitle}
            </Typography>
          )}

          {goToText && (
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={onGoToClick}
            >
              {goToText}
            </Button>
          )}
        </Box>
      </CardContent>
    </BlankCard>
  );
};

export default Banner;
