"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../utils/AuthService";

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

export default function SimpleNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <>
      <Box bg={"#A2EAC3"} px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
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
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutAndRedirect}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
