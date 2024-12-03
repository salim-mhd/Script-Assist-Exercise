import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Container,
  Title,
  Text,
  Badge,
  Grid,
  Group,
  Stack,
  Divider,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { IconUser, IconFile, IconCar, IconRocket } from "@tabler/icons-react";
import Navbar from "../../components/navbar/Navbar";

interface Resource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

const fetchResource = async (id: string | undefined): Promise<Resource> => {
  if (!id) {
    throw new Error("Invalid resource ID");
  }

  const res = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch resource");
  }

  return res.json();
};

const ResourceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Resource>(["resource", id], () =>
    fetchResource(id)
  );

  if (isLoading) return <LoadingOverlay visible overlayBlur={2} />;
  if (error instanceof Error)
    return (
      <Container
        size="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert color="red" title="Error">
          {error.message}
        </Alert>
      </Container>
    );

  return (
    <>
      <Navbar />
      <Container
        size="sm"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {data ? (
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{ width: "100%" }}
          >
            {/* Character Header */}
            <Group position="apart" align="center" mb="md">
              <Group>
                <IconUser size={32} />
                <Title order={2}>{data.name}</Title>
              </Group>
              <Badge color="blue" size="lg" variant="outline">
                {data.gender}
              </Badge>
            </Group>
            <Divider />

            {/* Details Section */}
            <Grid mt="md">
              <Grid.Col span={6}>
                <Stack spacing="xs">
                  <Text>Height: {data.height} cm</Text>
                  <Text>Mass: {data.mass} kg</Text>
                  <Text>Hair Color: {data.hair_color}</Text>
                  <Text>Skin Color: {data.skin_color}</Text>
                  <Text>Eye Color: {data.eye_color}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={6}>
                <Stack spacing="xs">
                  <Text>Birth Year: {data.birth_year}</Text>
                  <Text>
                    Homeworld:{" "}
                    <a
                      href={data.homeworld}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff" }}
                    >
                      View Homeworld
                    </a>
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Films */}
            <Group mt="lg" dir="column" spacing="xs">
              <Group>
                <IconFile size={24} />
                <Title order={3}>Films</Title>
              </Group>
              {data.films.length > 0 ? (
                data.films.map((film, index) => (
                  <Badge
                    key={index}
                    color="blue"
                    variant="light"
                    component="a"
                    href={film}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Film {index + 1}
                  </Badge>
                ))
              ) : (
                <Text>No films available</Text>
              )}
            </Group>

            {/* Vehicles */}
            <Group mt="lg" dir="column" spacing="xs">
              <Group>
                <IconCar size={24} />
                <Title order={3}>Vehicles</Title>
              </Group>
              {data.vehicles.length > 0 ? (
                data.vehicles.map((vehicle, index) => (
                  <Badge
                    key={index}
                    color="teal"
                    variant="light"
                    component="a"
                    href={vehicle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vehicle {index + 1}
                  </Badge>
                ))
              ) : (
                <Text>No vehicles available</Text>
              )}
            </Group>

            {/* Starships */}
            <Group mt="lg" dir="column" spacing="xs">
              <Group>
                <IconRocket size={24} />
                <Title order={3}>Starships</Title>
              </Group>
              {data.starships.length > 0 ? (
                data.starships.map((starship, index) => (
                  <Badge
                    key={index}
                    color="red"
                    variant="light"
                    component="a"
                    href={starship}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Starship {index + 1}
                  </Badge>
                ))
              ) : (
                <Text>No starships available</Text>
              )}
            </Group>
          </Card>
        ) : (
          <Text align="center">No Data Available</Text>
        )}
      </Container>
    </>
  );
};

export default ResourceDetails;
