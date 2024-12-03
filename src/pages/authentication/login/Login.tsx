import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Title,
  PasswordInput,
  Stack,
  Alert,
  LoadingOverlay,
  Grid,
  Center,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../../../store/auth.store";
import { IconAlertCircle } from "@tabler/icons-react";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Mock login data for demonstration
  const mockUsers = [
    {
      email: "user1@test.com",
      password: "password123",
      userName: "User One",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "user2@test.com",
      password: "password456",
      userName: "User Two",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setLoading(true);

    // Simulate API login
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    // Pass user details here and Redirect to private page
    if (user) {
      const mockToken = "mocked-jwt-token";
      login({ token: mockToken, userDetails: user });
      setLoading(false);
      setError(null);
      navigate("/");
    } else {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container size="md">
      <Grid justify="center" align="center" style={{ height: "100vh" }}>
        <Grid.Col span={12} sm={8} md={6}>
          <Paper shadow="lg" p="xl" radius="lg" withBorder>
            <LoadingOverlay visible={loading} overlayBlur={2} />
            <Stack spacing="lg">
              {/* Title */}
              <Title align="center" order={2} color="blue">
                Welcome Back
              </Title>
              <Title align="center" order={6} color="dimmed">
                Please login to access More Details
              </Title>

              {/* Error Alert */}
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Login Failed"
                  color="red"
                  radius="md"
                  variant="outline"
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label="Email"
                      placeholder="Enter your email"
                      error={errors.email?.message}
                      mt="md"
                      size="md"
                      labelProps={{
                        style: { color: "black" },
                      }}
                      radius="xs"
                      withAsterisk
                      autoFocus
                      styles={{
                        input: {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  )}
                />

                {/* Password Field */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      label="Password"
                      placeholder="Enter your password"
                      error={errors.password?.message}
                      mt="md"
                      size="md"
                      radius="lg"
                      withAsterisk
                      styles={{
                        input: {
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  )}
                />

                {/* Submit Button */}
                <Button
                  fullWidth
                  mt="xl"
                  size="md"
                  type="submit"
                  color="blue"
                  radius="md"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  Login
                </Button>
              </form>

              {/* Navigation to Landing Page */}
              <Center>
                <Button
                  variant="light"
                  color="gray"
                  mt="lg"
                  size="sm"
                  onClick={() => navigate("/")}
                >
                  Go to Dashboard
                </Button>
              </Center>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Login;
