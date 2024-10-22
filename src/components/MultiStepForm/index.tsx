import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalForm from "./PersonalForm";
import CountryForm from "./ShippingAddressForm";
import PaymentForm from "./PaymentForm";
import Summary from "./Summary";
import { FormValue } from "../../types/Form";
import { DevTool } from "@hookform/devtools";

// Material-UI Components
import {
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Grid2,
  Divider,
} from "@mui/material";
type FormFieldNames = keyof FormValue;
const MultipleStepForm = () => {
  const methods = useForm<FormValue>({
    mode: "onChange", // Validation mode
  });
  const { trigger } = methods; // Destructure trigger from useForm
  const [step, setStep] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Array of images corresponding to each step
  const stepImages = [
    "/PersonalInfoImage.png", // Step 1 image
    "/CountryFormImage.png", // Step 2 image
    "/PaymentImage.png", // Step 3 image
    "/SummaryImage.png", // Step 4 image (example)
  ];

  const steps = ["Personal", "Shipping", "Payment", "Summary"];

  // Define the fields that need to be validated in each step
  const getStepValidationFields = (currentStep: number): FormFieldNames[] => {
    switch (currentStep) {
      case 1:
        return ["firstName", "lastName", "email"];
      case 2:
        return ["country", "city"];
      case 3:
        return ["creditCard", "expiryDate", "cvv"];
      default:
        return [];
    }
  };

  const onNext = async () => {
    const fieldsToValidate = getStepValidationFields(step);

    const isValid = await trigger(fieldsToValidate); // getting error here

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "10px",
        margin: "20px auto",
      }}
    >
      <Card sx={{ width: "80%", maxWidth: "1200px", height: "100%", p: 4 }}>
        <Stepper activeStep={step - 1} alternativeLabel={!isMobile}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>
      <Divider />
      <Card sx={{ width: "80%", maxWidth: "1200px" }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
              <img
                src={stepImages[step - 1]}
                alt="Step Image"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 8 }} padding="2rem 4rem">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {step === 1 && <PersonalForm />}
                  {step === 2 && <CountryForm />}
                  {step === 3 && <PaymentForm />}
                  {step === 4 && <Summary />}

                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {step > 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onBack}
                      >
                        Back
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    )}
                  </div>
                </form>

                {/* DevTool for form state inspection in development */}
                {process.env.NODE_ENV === "development" && (
                  <DevTool control={methods.control} />
                )}
              </FormProvider>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultipleStepForm;
