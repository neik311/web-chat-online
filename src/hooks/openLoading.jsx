import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function OpenLoading() {
  return (
    <Stack
      sx={{ color: "grey.500", marginLeft: "auto", marginRight: "auto" }}
      spacing={2}
      direction="row"
    >
      <CircularProgress
        color="inherit"
        sx={{ marginLeft: "auto", marginRight: "auto" }}
      />
    </Stack>
  );
}
