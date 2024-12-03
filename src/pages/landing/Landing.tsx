import { FC } from "react";
import { Container, Title } from "@mantine/core";
import Navbar from "../../components/navbar/Navbar";
import ResourceList from "../../components/resourceList/ResourceList";

const Landing: FC = () => {
  return (
    <Container fluid>
      <Navbar />
      <ResourceList />
    </Container>
  );
};

export default Landing;
