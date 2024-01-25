import { Grid } from "@mui/material";
import StatisticsCard, { StatisticsCardProps } from "@ui/shared/StatisticsCard";

export interface TopCardsProps {
  data: StatisticsCardProps[];
}

const TopCards = ({ data }: TopCardsProps) => {
  return (
    <Grid
      container
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {data.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={4} key={i}>
          <StatisticsCard
            title={topcard.title}
            item={topcard.item}
            icon={topcard.icon}
            percentage={topcard.percentage}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
