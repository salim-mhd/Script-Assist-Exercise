import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Container,
  TextInput,
  LoadingOverlay,
  Title,
  Alert,
  Select,
  Pagination,
  Card,
  Space,
  Text,
  Group,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react"; // Import sort icons

// Define types for resource and API response
interface Resource {
  name: string;
  gender: string;
  url: string;
}

interface ApiResponse {
  results: Resource[];
}

// Fetch resources from the API
const fetchResources = async (): Promise<ApiResponse> => {
  const res = await fetch("https://swapi.dev/api/people/");
  if (!res.ok) {
    throw new Error("Failed to fetch resources");
  }
  return res.json();
};

const ResourceList: React.FC = () => {
  // State variables for search, sorting, pagination, etc.
  const { data, isLoading, error } = useQuery<ApiResponse>(
    ["resources"],
    fetchResources
  );
  const [search, setSearch] = useState<string>(""); // Search query
  const [sort, setSort] = useState<keyof Resource>("name"); // Sort field (name or gender)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // Sort direction (ascending/descending)
  const [page, setPage] = useState<number>(1); // Current page for pagination
  const itemsPerPage = 5; // Items per page

  // Loading and error handling
  if (isLoading) return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  if (error instanceof Error)
    return (
      <Alert color="red" title="Error" style={{ marginBottom: "20px" }}>
        {error.message}
      </Alert>
    );

  // Filter data based on search query
  const filteredData = data?.results.filter((resource) =>
    resource.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting logic based on selected sort field and direction
  const sortedData = filteredData?.sort((a, b) => {
    const comparison = a[sort].localeCompare(b[sort]);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination: Slice the sorted data to match the current page
  const paginatedData = sortedData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Check if there is no data to display
  const isNoData = paginatedData?.length === 0;

  return (
    <Container size="lg" mt="xl">
      <Card shadow="xl" p="md" radius="md" withBorder>
        {/* Title */}
        <Title order={2} align="center" mb="md" color="blue">
          Star Wars Characters
        </Title>

        {/* Search and Sort Options */}
        <Group position="apart" mb="md" align="center">
          {/* Search Input */}
          <TextInput
            style={{ width: "50%" }}
            placeholder="Enter character name"
            label="Search by Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="md"
            radius="md"
            icon={<IconSearch />} // Search icon
          />

          {/* Sorting Options */}
          <Group spacing="sm" align="center">
            <Select
              label="Sort By"
              value={sort}
              onChange={(value) => setSort(value as keyof Resource)}
              data={[
                { value: "name", label: "Name" },
                { value: "gender", label: "Gender" },
              ]}
              size="md"
              radius="md"
              style={{ flexGrow: 1 }}
            />
            <Group m={"md"} mt={"xl"} spacing="sm">
              <ActionIcon
                variant="outline"
                onClick={() => setSortDirection("asc")}
                title="Sort A-Z"
                color={sortDirection === "asc" ? "blue" : "gray"}
              >
                <IconSortAscending size={20} />
              </ActionIcon>
              <ActionIcon
                variant="outline"
                onClick={() => setSortDirection("desc")}
                title="Sort Z-A"
                color={sortDirection === "desc" ? "blue" : "gray"}
              >
                <IconSortDescending size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>

        {/* No Data Message */}
        {isNoData && (
          <Text align="center" color="gray" mt="md">
            No data found based on your search and sort criteria.
          </Text>
        )}

        {/* Table to Display Resources */}
        {!isNoData && (
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>More Info</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.name}</td>
                  <td>{resource.gender}</td>
                  <td>
                    <Link
                      to={`/resource/${index + 1}`}
                      style={{
                        color: "#0066cc",
                        textDecoration: "none",
                      }}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Pagination */}
        {!isNoData && (
          <Pagination
            value={page}
            onChange={setPage}
            total={Math.ceil((filteredData?.length || 0) / itemsPerPage)}
            mt="xl"
            style={{ display: "flex", justifyContent: "center" }} // Center pagination
          />
        )}
      </Card>

      <Space h="lg" />
    </Container>
  );
};

export default ResourceList;
