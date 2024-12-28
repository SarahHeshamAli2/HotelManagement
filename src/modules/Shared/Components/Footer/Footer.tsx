import { Box, Link, Stack, Typography } from "@mui/material";
import Logo from "../Logo/Logo";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  const headerStyles = {
    marginBottom: "1.4375rem",
    color: "#152C5B",
    fontSize: "1.125rem",
  };

  const textStyles = {
    fontWeight: "300",
    color: "#B0B0B0",
    marginBottom: "8px",
  };

  return (
    <Box
      component="footer"
      sx={{
        paddingBlock: "50px",
        borderTop: "1px solid #E5E5E5",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 9 }}
        sx={{
          justifyContent: "space-around",
          alignItems: { xs: "center", md: "normal" },
        }}
      >
        <Box>
          <Logo />
          <Typography sx={{ ...textStyles, mt: "8px" }}>
            {t("footer_title")}
            <br />
            {t("footer_sub")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={headerStyles}>
            {t("beginner_footer")}
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            <Link
              href="/register"
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                color: "#B0B0B0",
              }}
            >
              {t("new_account")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            {t("book_room")}
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            {t("payment_footer")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={headerStyles}>
            {t("explore_footer")}
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            {t("career_footer")}
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            {t("privacy_footer")}
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            {t("terms_footer")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={headerStyles}>
            {t("contact_footer")}
          </Typography>
          <Typography sx={textStyles}>support@staycation.id</Typography>
          <Typography sx={textStyles}>021 - 2208 - 1996</Typography>
          <Typography sx={textStyles}>Staycation, Kemang, Jakarta</Typography>
        </Box>
      </Stack>
      <Box sx={{ textAlign: "center", mt: "50px", ...textStyles }}>
        Copyright 2019 • All rights reserved • Staycation
      </Box>
    </Box>
  );
};

export default Footer;
