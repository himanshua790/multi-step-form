import {
  Card,
  CardContent,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Grid2,
} from "@mui/material";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const steps = ["Step 1", "Step 2", "Step 3"];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-4xl">
        <CardContent>
          <div className="w-full max-w-4xl m-4">
            <Stepper
              activeStep={1}
              alternativeLabel={!isMobile}
              orientation={"horizontal"}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <Grid2 container spacing={2}>
            {/* Image Section */}
            {!isMobile && (
              <Grid2 size={4} className="h-[500px] w-[250px] border">
                <img
                  src="/PersonalInfoImage.png"
                  alt="Placeholder"
                  className="object-fill h-[500px]"
                />
              </Grid2>
            )}
            {/* Form Section */}
            <Grid2 size={isMobile ? 12 : 8}>
              <form className="h-full flex flex-col justify-between">
                <div>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4"
                  fullWidth
                >
                  Submit
                </Button>
              </form>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
