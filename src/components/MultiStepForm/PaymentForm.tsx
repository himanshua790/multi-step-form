import React from "react";
import { Card, CardContent, Typography, TextField, Grid2 } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const PaymentForm: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payment Information
        </Typography>
        
        <Grid2 container spacing={2}>
          {/* Credit Card Number */}
          <Grid2 size={12}>
            <Controller
              name="creditCard"
              control={control}
              defaultValue=""
              rules={{
                required: "Credit card number is required",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Enter a valid 16-digit credit card number",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Credit Card Number"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error ? error.message : ""}
                  autoComplete="off"
                  variant="outlined"
                />
              )}
            />
          </Grid2>

          {/* Expiry Date */}
          <Grid2 size={12}>
            <Controller
              name="expiryDate"
              control={control}
              defaultValue=""
              rules={{ required: "Expiry date is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error ? error.message : ""}
                  autoComplete="off"
                  variant="outlined"
                />
              )}
            />
          </Grid2>

          {/* CVV */}
          <Grid2 size={12}>
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              rules={{
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: "Enter a valid CVV",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="CVV"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error ? error.message : ""}
                  autoComplete="off"
                  variant="outlined"
                />
              )}
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
