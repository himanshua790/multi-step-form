import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext, ControllerProps } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  rules: ControllerProps["rules"];
  placeholder?: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  rules,
  placeholder = "",
  type = "text",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          type={type}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : ""}
          size="small"
        />
      )}
    />
  );
};
