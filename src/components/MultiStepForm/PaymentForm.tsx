import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid2,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import AddressForm from "./AddressFrom";
import { cardImageMapping, getCardType } from "../../utils/checkCard";

const PaymentForm: React.FC = () => {
  const { control, setValue, watch } = useFormContext();
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [cardType, setCardType] = useState<string | null>(null);

  const shippingAddress = watch("address"); // Watch the shipping address values

  // Handle toggle change
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSame = event.target.checked;
    setBillingSameAsShipping(isSame);
    if (isSame) {
      setValue("billingAddress", shippingAddress); // Copy shipping address to billing
    } else {
      setValue("billingAddress", {});
    }
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cardNumber = event.target.value;
    setCardType(getCardType(cardNumber)); // Detect card type on input change
  };

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
                  value: /^[0-9]{13,19}$/, // Matches credit card numbers between 13 and 19 digits
                  message: "Enter a valid credit card number",
                },
                validate: {
                  isValidLength: (value) => {
                    const cardType = getCardType(value); // Use the card detection function
                    if (cardType === "Amex")
                      return (
                        value.length === 15 ||
                        "Amex card should be 15 digits long"
                      );
                    if (
                      cardType === "Visa" ||
                      cardType === "Mastercard" ||
                      cardType === "Discover"
                    ) {
                      return (
                        value.length === 16 ||
                        "Card number should be 16 digits long"
                      );
                    }
                    if (cardType === "DinersClub")
                      return (
                        value.length === 14 ||
                        "Diners Club card should be 14 digits long"
                      );
                    return true; // For other card types, no specific validation is required
                  },
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div style={{ position: "relative" }}>
                  <TextField
                    fullWidth
                    label="Credit Card Number"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Let react-hook-form handle it
                      handleCardNumberChange(
                        e as ChangeEvent<HTMLInputElement>
                      ); // Check for card type
                    }}
                    error={!!error}
                    helperText={error ? error.message : ""}
                    autoComplete="off"
                    variant="outlined"
                  />
                  {cardType && (
                    <img
                      src={`/cards/${
                        cardImageMapping[cardType] || "Unkown.png"
                      }`}
                      alt={cardType}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        height: "24px",
                      }}
                    />
                  )}
                </div>
              )}
            />
          </Grid2>
          {/* Name on Card */}
          <Grid2 size={12}>
            <Controller
              name="nameOnCard"
              control={control}
              defaultValue=""
              rules={{
                required: "Name on card is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Name on Card"
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
              rules={{
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // MM/YY format
                  message: "Enter a valid expiry date in MM/YY format",
                },
                validate: {
                  isFutureDate: (value) => {
                    const [month, year] = value.split("/").map(Number);
                    if (!month || !year) return "Invalid date format";

                    // Get current month and year
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
                    const currentMonth = currentDate.getMonth() + 1; // Get current month (0-based index)

                    if (
                      year < currentYear ||
                      (year === currentYear && month < currentMonth)
                    ) {
                      return "Expiry date cannot be in the past";
                    }
                    return true;
                  },
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error ? error.message : "Format: MM/YY"}
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

          {/* Toggle for billing address same as shipping */}
          <Grid2 size={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={billingSameAsShipping}
                  onChange={handleToggleChange}
                />
              }
              label="Billing address same as shipping"
            />
          </Grid2>

          {/* Billing Address */}
          {!billingSameAsShipping && (
            <Grid2 size={12}>
              <AddressForm
                formName="billingAddress"
                isBillingAddress
                isDisabled={billingSameAsShipping}
              />
            </Grid2>
          )}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
