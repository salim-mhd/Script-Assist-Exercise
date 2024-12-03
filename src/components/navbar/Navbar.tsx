import React from "react";
import {
  Container,
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const Navbar = () => {
  const theme = useMantineTheme();
  const { isAuthenticated, logout, userDetails } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: theme.colors.gray[0],
        padding: "10px 0",
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      <Container size="lg">
        <Group position="apart">
          {/* App Title */}
          <Text weight={700} size="xl">
            My App
          </Text>

          {/* User Profile or Login Button */}
          {isAuthenticated ? (
            <Menu width={160} position="bottom-end">
              <Menu.Target>
                <UnstyledButton>
                  <Group spacing={10}>
                    <Avatar src={userDetails?.image} alt="Profile Picture" />
                    <Text size="sm" weight={500}>
                      {userDetails?.userName}
                    </Text>
                    <IconChevronDown size={12} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconLogout size={16} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <UnstyledButton
              onClick={() => navigate("/login")}
              style={{
                padding: "8px 16px",
                backgroundColor: theme.colors.indigo[6],
                color: theme.white,
                borderRadius: theme.radius.sm,
                fontWeight: 500,
                border: `1px solid ${theme.colors.indigo[7]}`,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = theme.colors.indigo[7])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = theme.colors.indigo[6])
              }
            >
              Login
            </UnstyledButton>
          )}
        </Group>
      </Container>
    </Container>
  );
};

export default Navbar;
