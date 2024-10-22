import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import Config from "../../config/rapidApi";
import { useDebounce } from "../../hooks/useDebounce";
import { City, Country } from "../../types/Form"; // Import the Country and City types

const ShippingAddressForm: React.FC = () => {
  const { control, watch, setValue } = useFormContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loadingCities, setLoadingCities] = useState<boolean>(false);
  const [cityInput, setCityInput] = useState<string>("");
  const debouncedCityInput = useDebounce(cityInput, 1000);
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

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

  useEffect(() => {
    if (
      debouncedCityInput &&
      debouncedCityInput.length > 2 &&
      selectedCountry
    ) {
      setLoadingCities(true);
      axios
        .get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
          headers: {
            "X-RapidAPI-Key": Config.rapidAPIKey,
          },
          params: {
            countryIds: selectedCountry.value, // Using the country code
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

  // If returning to form, set the city input to selected city's name
  useEffect(() => {
    if (selectedCity) {
      setCityInput(selectedCity.city);
    }
  }, [selectedCity]);

  return (
    <Box sx={{ p: 4, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Country & City Information
      </Typography>

      {/* Country Autocomplete */}
      <Controller
        name="country"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            loading={loadingCountries}
            value={field.value || null}
            onChange={(_, value) => {
              field.onChange(value); // Store the entire country object
              setValue("city", null); // Clear the city when country changes
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Country"
                variant="outlined"
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <>
                        {loadingCountries ? (
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

      {/* City Autocomplete */}
      {selectedCountry && (
        <Box sx={{ mt: 3 }}>
          <Controller
            name="city"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Autocomplete
                options={cities}
                getOptionLabel={(option) => option.city}
                loading={loadingCities}
                inputValue={cityInput}
                onInputChange={(_, value) => setCityInput(value)}
                value={field.value || null}
                onChange={(_, value) => {
                  field.onChange(value); // Store the entire city object
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search for a City"
                    variant="outlined"
                    fullWidth
                    slotProps={{
                      input: {
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
        </Box>
      )}
    </Box>
  );
};

export default ShippingAddressForm;
