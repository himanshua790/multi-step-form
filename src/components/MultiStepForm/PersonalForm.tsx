import React from "react";
import { Grid2, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { PhoneNumberInput } from "../Fields/PhoneNumberInput";

const PersonalForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Grid2 container spacing={2}>
      {/* Title */}
      <Grid2 size={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginX: "auto",
            marginBottom: 2,
          }}
        >
          Personal Info
        </Typography>
      </Grid2>

      {/* First Name */}
      <Grid2 size={12}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First name is required" }}
          defaultValue={"Himanshu"} // TODO: Remove
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="First Name"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : ""}
              size="small"
            />
          )}
        />
      </Grid2>

      {/* Last Name */}
      <Grid2 size={12}>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last name is required" }}
          defaultValue={"Soni"} // TODO: Remove
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Last Name"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : ""}
              size="small"
            />
          )}
        />
      </Grid2>

      {/* Email */}
      <Grid2 size={12}>
        <Controller
          name="email"
          control={control}
          defaultValue={"Himanshu@gmail.com"} // TODO: Remove
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : ""}
              size="small"
            />
          )}
        />
      </Grid2>

      {/* Phone Number with Country Code */}
      <Grid2 size={12}>
        <PhoneNumberInput />
      </Grid2>
    </Grid2>
  );
};

export default PersonalForm;
