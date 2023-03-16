import {
  Box,
  Button,
  HStack,
  useDisclosure,
  Text,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronDown, FaPenAlt, FaSignOutAlt } from "react-icons/fa";

import CenterContainer from "~/components/common/CenterContainer";
import Logo from "~/components/common/Logo";
import CreatePostFormModal from "~/pages/home/components/modals/CreatePostFormModal";
import { api } from "~/utils/api";

const Navbar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading: isCurrentUserLoading, data: currentUser } =
    api.user.currentUser.useQuery();

  const handleSignOut = async () => {
    localStorage.setItem("@token", "");
    await router.push("/");
  };

  return (
    <>
      <Box bg="white" position="sticky" top="0" zIndex={100} shadow="sm">
        <CenterContainer
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p="5"
        >
          <Logo />

          <HStack gap="1">
            <Button
              leftIcon={<FaPenAlt />}
              colorScheme="blue"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              rounded="xl"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
              onClick={onOpen}
            >
              Write
            </Button>
            {!isCurrentUserLoading && currentUser && (
              <Menu>
                <MenuButton>
                  <HStack>
                    <Text fontWeight="bold">{currentUser.name}</Text>
                    <Avatar
                      name={currentUser?.name}
                      size="sm"
                      bg="yellow.500"
                    />
                    <Icon as={FaChevronDown} fontSize="sm" color="gray.600" />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<Icon as={FaSignOutAlt} />}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>
        </CenterContainer>
      </Box>

      <CreatePostFormModal isVisible={isOpen} handleClose={onClose} />
    </>
  );
};

export default Navbar;
