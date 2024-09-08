import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>SpaceEnthusiast</Typography>
        <Typography color={medium}>astrogram.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The best place to find all your space related content. Follow us for more! 🚀 
        <a color={main} href="#">#space</a> <a color={main} href="http://www.nasa.com">#nasa</a> <a color={main} href="#">#astronomy</a>
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;