import React from "react";
import { Grid2, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const PhoneNumberInput: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Grid2 container spacing={2}>
      {/* Country Code Input */}
      <Grid2 size={3}>
        <Controller
          name="countryCode"
          control={control}
          defaultValue=""
          rules={{ required: "Country code is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Country Code"
              placeholder="+91"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </Grid2>

      {/* Phone Number Input */}
      <Grid2 size={9}>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Phone number is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone Number"
              placeholder="9898989898"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
