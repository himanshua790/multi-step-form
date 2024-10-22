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
          rules={{
            required: "Country code is required",
            pattern: {
              value: /^\+\d{1,4}$/, // Ensures the country code starts with "+" followed by 1-4 digits
              message: "Enter a valid country code (e.g., +91)",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Country Code"
              placeholder="+91"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : "Format: +[Country Code]"}
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
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^\d{7,15}$/, // Validates phone numbers with 7 to 15 digits
              message: "Enter a valid phone number with 7 to 15 digits",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone Number"
              placeholder="9898989898"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : "Enter a valid phone number"}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
