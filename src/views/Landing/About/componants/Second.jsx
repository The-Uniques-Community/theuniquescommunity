import React from "react";
import { Box, Typography, Grid, Card, Stack, Chip, Container } from "@mui/material";
import Button from "@/utils/Buttons/Button";
import { useTheme } from "@mui/material";

const BatchProfile = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const batchData = [
    {
      label: "Batch 1.0",
      icon: "tabler-users",
      title: "The Uniques Batch 1.0",
      description:
        "The pioneer batch that set the benchmark for excellence in coding and innovation.",
      image: "/assets/images/batch1.jpg",
      details: [
        "50 Students",
        "Skills: JavaScript, React, Node.js",
        "Projects: 15 Team Projects",
        "Focus: Web Development",
      ],
    },
    {
      label: "Batch 2.0",
      icon: "tabler-code",
      title: "The Uniques Batch 2.0",
      description:
        "The second wave of talented individuals, refining their skills in modern technologies.",
      image: "/assets/images/batch2.jpg",
      details: [
        "60 Students",
        "Skills: Python, Django, Data Analysis",
        "Projects: 20 Individual Projects",
        "Focus: Backend Development",
      ],
    },
    {
      label: "Batch 3.0",
      icon: "tabler-rocket",
      title: "The Uniques Batch 3.0",
      description:
        "The latest batch pushing the boundaries of innovation and creativity.",
      image: "/assets/images/batch3.jpg",
      details: [
        "40 Students",
        "Skills: Machine Learning, AI, Cloud Computing",
        "Projects: 10 Open Source Contributions",
        "Focus: Emerging Technologies",
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "2rem 0",
      }}
    >
      <Container
        sx={{
          width: "85%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        {/* Header Section */}
        <Stack spacing={2} sx={{ marginBottom: "2rem" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              color: theme.palette.primary.dark,
            }}
          >
            Batch Profiles
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Explore the talented batches of The Uniques and their amazing
            achievements.
          </Typography>
        </Stack>

        {/* Tabs Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            padding: "8px 16px",
            width: "fit-content",
            margin: "auto",
          }}
        >
          {batchData.map((batch, index) => (
            <Chip
              key={index}
              label={batch.label}
              icon={
                <svg
                  className={batch.icon}
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <use
                    xlinkHref={`/assets/svg/tabler-sprite-outline.svg#${batch.icon}`}
                  />
                </svg>
              }
              onClick={() => handleChange(null, index)}
              sx={{
                margin: "0 6px",
                width: { xs: "auto", sm: "110px" },
                height: "36px",
                fontSize: "0.75rem",
                backgroundColor:
                  value === index
                    ? theme.palette.primary.main
                    : theme.palette.action.hover,
                color: value === index
                  ? theme.palette.primary.light
                  : theme.palette.text.secondary,
                borderRadius: "16px",
                fontWeight: value === index ? "bold" : "normal",
                cursor: "pointer",
                ":hover": {
                  backgroundColor:
                    value === index
                      ? theme.palette.primary.dark
                      : theme.palette.action.selected,
                },
              }}
            />
          ))}
        </Box>

        {/* Dynamic Tab Content */}
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "1.5rem" }}
        >
          {/* Left Section */}
          <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
            <Card
              elevation={0}
              sx={{
                backgroundImage: `url('${batchData[value].image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: { xs: "200px", sm: "250px", md: "300px" },
                borderRadius: "12px",
              }}
            />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={7}>
            <Card
              elevation={0}
              sx={{
                padding: { xs: "1rem", sm: "1.5rem" },
                textAlign: "left",
              }}
            >
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                    color: theme.palette.primary.main,
                  }}
                >
                  {batchData[value].title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                >
                  {batchData[value].description}
                </Typography>

                {/* Details */}
                <Grid container spacing={1}>
                  {batchData[value].details.map((detail, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {detail}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>

                {/* Know More Button */}
                <Box sx={{  marginTop: "1rem" }}>
                  <Button
                    bgColor={theme.palette.primary.main}
                    borderColor={theme.palette.primary.dark}
                    textColor={theme.palette.primary.light}
                  >
                    Know More
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BatchProfile;
