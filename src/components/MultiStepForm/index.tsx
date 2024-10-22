import { DevTool } from "@hookform/devtools";
import {
  Button,
  Card,
  CardContent,
  Grid2,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "../../types/Form";
import AddressForm from "./AddressFrom";
import PaymentForm from "./PaymentForm";
import PersonalForm from "./PersonalForm";
import Summary from "./Summary";

type FormFieldNames = keyof FormValues;

// Array of images corresponding to each step
const stepImages = [
  "/PersonalInfoImage.png", // Step 1 image
  "/CountryFormImage.png", // Step 2 image
  "/PaymentImage.png", // Step 3 image
  "/SummaryImage.png", // Step 4 image (example)
];

const MultipleStepForm = () => {
  const methods = useForm<FormValues>({
    mode: "onChange",
  });
  const { trigger } = methods;
  const [step, setStep] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = ["Personal", "Shipping", "Payment", "Summary"];

  // Define the fields that need to be validated in each step
  const getStepValidationFields = (currentStep: number): FormFieldNames[] => {
    switch (currentStep) {
      case 1:
        return ["firstName", "lastName", "email"];
      case 2:
        return ["address"];
      case 3:
        return ["creditCard", "expiryDate", "cvv", "billingAddress"];
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

  const onSubmit = (data: FormValues) => {
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card
            sx={{ width: "80%", maxWidth: "1200px", p: 4, margin: "20px auto" }}
          >
            <Stepper activeStep={step - 1} alternativeLabel={!isMobile}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Card>

          <Card sx={{ width: "80%", maxWidth: "1200px", margin: "20px auto" }}>
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

                <Grid2
                  size={{ xs: 12, md: 8 }}
                  sx={{ minWidth: "390px", width: "100%" }}
                >
                  {step === 1 && <PersonalForm />}
                  {step === 2 && <AddressForm formName="address" />}
                  {step === 3 && <PaymentForm />}
                  {step === 4 && <Summary />}
                  <div className="flex mt-5">
                    {step > 1 && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={onBack}
                        sx={{
                          mr: "auto", // margin-right auto pushes the next button to the right
                        }}
                      >
                        Back
                      </Button>
                    )}

                    {step < 4 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onNext}
                        sx={{
                          ml: "auto", // margin-left auto pushes the button to the far right
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          ml: "auto", // ensure the submit button is on the right
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
      {/* DevTool for form state inspection in development */}
      {process.env.NODE_ENV === "development" && (
        <DevTool control={methods.control} />
      )}
    </div>
  );
};

export default MultipleStepForm;
