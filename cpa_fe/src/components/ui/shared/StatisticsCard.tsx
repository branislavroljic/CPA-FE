import { StatisticsCardType } from "@api/user/user";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { useCustomizerStore } from "@stores/customizerStore";
import { IconArrowBack } from "@tabler/icons-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  item: StatisticsCardType;
  icon: ReactNode;
};

const StatisticsCard = ({ title, item, icon }: Props) => {
  const isCardShadow = useCustomizerStore((state) => state.isCardShadow);

  return (
    <Card
      sx={{ padding: "20px", width: "30%", borderRadius: "5px" }}
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
        {/* <Chip label="kakoe"></Chip> */}
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
              Today
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
            <Stack direction={"row"} gap={5}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                Today
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
            <Stack direction={"row"} gap={5}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                Today
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
            <Stack direction={"row"} gap={5}>
              <Typography
                variant="body1"
                color={"#475f7b80"}
                fontWeight={400}
                fontSize={"15px"}
              >
                Today
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
