import {
    Autocomplete,
    CircularProgress,
    Grid2,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Config from "../../config/rapidApi";
import { useDebounce } from "../../hooks/useDebounce";
import { City, Country } from "../../types/Form";

type AddressFormProps = {
  isBillingAddress?: boolean;
  isDisabled?: boolean;
  formName: "address" | "billingAddress"; // Allows distinguishing between shipping and billing forms
};

const AddressForm: React.FC<AddressFormProps> = ({
  isBillingAddress = false,
  isDisabled = false,
  formName,
}) => {
  const { control, watch, setValue } = useFormContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [cityInput, setCityInput] = useState<string>("");
  const debouncedCityInput = useDebounce(cityInput, 1000);
  const selectedCountry = watch(`${formName}.country`);
  const selectedCity = watch(`${formName}.city`);

  // Fetch countries
  const fetchCountries = useCallback(() => {
    const savedCountries = localStorage.getItem("countries");
    if (savedCountries) {
      setCountries(JSON.parse(savedCountries));
    } else {
      setLoadingCountries(true);
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          const countryOptions: Country[] = response.data.map(
            (country: { name: { common: string }; cca2: string }) => ({
              label: country.name.common,
              value: country.cca2,
            })
          );
          const sortedCountries = countryOptions.sort((a, b) =>
            a.label.localeCompare(b.label)
          );
          localStorage.setItem("countries", JSON.stringify(sortedCountries));
          setCountries(sortedCountries);
        })
        .catch(() => {})
        .finally(() => setLoadingCountries(false));
    }
  }, []);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries.length, fetchCountries]);

  // Fetch cities when country and city input change
  useEffect(() => {
    if (debouncedCityInput && debouncedCityInput.length > 2 && selectedCountry) {
      setLoadingCities(true);
      axios
        .get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
          headers: {
            "X-RapidAPI-Key": Config.rapidAPIKey,
          },
          params: {
            countryIds: selectedCountry.value,
            namePrefix: debouncedCityInput,
            limit: 10,
          },
        })
        .then((response) => {
          const cityOptions: City[] = response.data.data.map((city: any) => ({
            id: city.id,
            city: city.city,
            country: city.country,
            countryCode: city.countryCode,
            latitude: city.latitude,
            longitude: city.longitude,
            population: city.population,
          }));
          setCities(cityOptions);
        })
        .catch(() => {})
        .finally(() => setLoadingCities(false));
    }
  }, [debouncedCityInput, selectedCountry]);

  // Set city input value if returning to form
  useEffect(() => {
    if (selectedCity) {
      setCityInput(selectedCity.city);
    }
  }, [selectedCity]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          {isBillingAddress ? "Billing Address" : "Shipping Address"}
        </Typography>
      </Grid2>

      {/* Address Input */}
      <Grid2 size={{xs: 12}}>
        <Controller
          name={`${formName}.street`}
          control={control}
          defaultValue=""
          rules={{ required: "Address is required", minLength: 5 }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Address"
              variant="outlined"
              disabled={isDisabled}
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </Grid2>

      {/* Country Autocomplete */}
      <Grid2 size={12}>
        <Controller
          name={`${formName}.country`}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              loading={loadingCountries}
              value={field.value || null}
              onChange={(_, value) => {
                field.onChange(value);
                setValue(`${formName}.city`, null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Country"
                  variant="outlined"
                  fullWidth
                  disabled={isDisabled}
                  slotProps={{
                    input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingCountries ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}}
                />
              )}
            />
          )}
        />
      </Grid2>

      {/* City Autocomplete */}
      <Grid2 size={12}>
        <Controller
          name={`${formName}.city`}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.city}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              loading={loadingCities}
              inputValue={cityInput}
              onInputChange={(_, value) => setCityInput(value)}
              value={field.value || null}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a City"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingCities ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          )}
        />
        </Grid2>
        </Grid2>
  );
};

export default AddressForm;
