import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useCustomizerStore } from "@stores/customizerStore";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { TrendingDown } from "@mui/icons-material";

export type StatisticsCardType = {
  today: string;
  yesterday: string;
  thisWeek: string;
  thisMonth: string;
};

export type StatisticsCardProps = {
  title: string;
  item: StatisticsCardType;
  icon: ReactNode;
  percentage: number;
};

const StatisticsCard = ({
  title,
  item,
  icon,
  percentage,
}: StatisticsCardProps) => {
  const { t } = useTranslation();
  const isCardShadow = useCustomizerStore((state) => state.isCardShadow);

  return (
    <Card
      sx={{ padding: "20px", borderRadius: "5px" }}
      elevation={isCardShadow ? 9 : 0}
      variant={!isCardShadow ? "outlined" : undefined}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ paddingBottom: "15px" }}
      >
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {icon}
          <Typography
            variant="body1"
            fontSize={"19px"}
            fontWeight={500}
            lineHeight={1.5}
            color={"#475f7b"}
          >
            {title}
          </Typography>
        </Stack>
        {percentage > 0 ? (
          <Chip
            label={`${percentage}%`}
            color="success"
            icon={<TrendingUpIcon />}
          ></Chip>
        ) : percentage < 0 ? (
          <Chip
            label={`${percentage}%`}
            color="error"
            icon={<TrendingDown />}
          ></Chip>
        ) : (
          <Chip label={`${percentage}%`} color="warning"></Chip>
        )}
      </Stack>
      <Divider variant="middle" />
      <CardContent sx={{ padding: "0px !important", marginTop: "12px" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack>
            <Typography
              variant="body1"
              color={"#475f7b80"}
              fontWeight={400}
              fontSize={"15px"}
            >
              {t("statistics.today")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              color={"#475f7b"}
              fontSize={"25px"}
              lineHeight={1.5}
            >
              {item.today}
            </Typography>
          </Stack>
          <Stack>
            <Stack direction={"row"} gap={5} justifyContent={"space-between"}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                {t("statistics.yesterday")}
              </Typography>
              <Typography
                variant="body1"
                color={"#475f7b"}
                fontWeight={500}
                fontSize={"15px"}
              >
                {item.yesterday}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={5} justifyContent={"space-between"}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                {t("statistics.thisWeek")}
              </Typography>
              <Typography
                variant="body1"
                color={"#475f7b"}
                fontWeight={500}
                fontSize={"15px"}
              >
                {item.thisWeek}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={5} justifyContent={"space-between"}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                {t("statistics.thisMonth")}
              </Typography>
              <Typography
                variant="body1"
                color={"#475f7b"}
                fontWeight={500}
                fontSize={"15px"}
              >
                {item.thisMonth}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
