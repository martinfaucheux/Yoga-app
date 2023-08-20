"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthService";
import { useUserData } from "../utils/UserDataService";

const Links = [
  { name: "Book", to: "/sessions" },
  { name: "Blog", to: "/blog" },
  { name: "About", to: "/about" },
];

const NavLink = (props) => {
  const { children, to } = props;

  return (
    <Box
      as={Link}
      px={2}
      py={1}
      fontSize="xl"
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#6DB990",
      }}
      to={to}
    >
      {children}
    </Box>
  );
};

const CornerMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userData = useUserData();

  const userName = userData
    ? `${userData.first_name} ${userData.last_name}`
    : null;

  const logoutAndRedirect = () => {
    logout();
    navigate("/login");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"md"} name={userName} bg="white" color="black" />
      </MenuButton>
      <MenuList>
        <MenuItem>Link 1</MenuItem>
        <MenuItem>Link 2</MenuItem>
        <MenuDivider />
        {isAuthenticated ? (
          <MenuItem onClick={logoutAndRedirect}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default function SimpleNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Box bg={"#A2EAC3"} px={{ base: 2, sm: 8 }}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            background={"#6DB990"}
          />
          <HStack spacing={20} alignItems={"center"}>
            <Box fontFamily="stylizedCursive" fontSize="4xl">
              Yogine
            </Box>
            <HStack
              as={"nav"}
              spacing={20}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} to={link.to}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isAuthenticated ? (
              <CornerMenu />
            ) : (
              <HStack
                spacing={{ base: "1", sm: "5" }}
                flex={{ base: 1, md: 0 }}
              >
                <Button
                  as={Link}
                  to="/login"
                  background={"#A2EAC3"}
                  borderWidth={{ base: 0, sm: 2 }}
                  borderColor={"black"}
                >
                  Sign in
                </Button>
                <Button as={Link} to="/register">
                  Sign up
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.to}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
