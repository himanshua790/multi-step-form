import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types/Form"; // Import the form types
import { Button, Card, CardContent, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion"; // Use framer-motion for animation

const Summary: React.FC = () => {
  const { getValues } = useFormContext<FormValues>(); // Retrieve form values
  const [submitted, setSubmitted] = useState(false);

  const formData = getValues(); // Get all form values

  const handleOrderSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Typography variant="h4" gutterBottom>
          Congrats! Your order has been placed.
        </Typography>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, loop: Infinity, ease: "linear" }}
          style={{ margin: "20px 0" }}
        >
          🎉
        </motion.div>
      </motion.div>
    );
  }

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>

        <Grid2 container spacing={2}>
          {/* Personal Information */}
          <Grid2 size={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Personal Information:
            </Typography>
            <Typography>First Name: {formData.firstName}</Typography>
            <Typography>Last Name: {formData.lastName}</Typography>
            <Typography>Email: {formData.email}</Typography>
            {formData.phoneNumber && (
              <Typography>Phone Number: {formData.phoneNumber}</Typography>
            )}
          </Grid2>

          {/* Shipping Address */}
          <Grid2 size={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Shipping Address:
            </Typography>
            <Typography>Street: {formData.address.street}</Typography>
            <Typography>Country: {formData.address.country?.label}</Typography>
            <Typography>City: {formData.address.city?.city}</Typography>
          </Grid2>

          {/* Billing Address */}
          {formData.billingAddress && (
            <Grid2 size={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Billing Address:
              </Typography>
              <Typography>Street: {formData.billingAddress.street}</Typography>
              <Typography>Country: {formData.billingAddress.country?.label}</Typography>
              <Typography>City: {formData.billingAddress.city?.city}</Typography>
            </Grid2>
          )}

          {/* Payment Information */}
          <Grid2 size={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Payment Information:
            </Typography>
            <Typography>Credit Card: **** **** **** {formData.creditCard.slice(-4)}</Typography>
            <Typography>Expiry Date: {formData.expiryDate}</Typography>
          </Grid2>

          {/* Submit Button */}
          <Grid2 size={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderSubmit}
            >
              Submit Order
            </Button>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default Summary;
