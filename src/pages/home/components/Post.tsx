import React from "react";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";

import EditPostFormModal from "~/pages/home/components/modals/EditPostFormModal";
import { getRelativeTime } from "~/utils/helper";
import DeletePostModal from "~/pages/home/components/modals/DeletePostModal";
import { api } from "~/utils/api";
import PostDetailModal from "~/pages/home/components/modals/PostDetailModal";

interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
  isDetail?: boolean;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  content,
  authorId,
  createdAt,
  isDetail,
}) => {
  const { isLoading: isCurrentUserLoading, data: currentUser } =
    api.user.currentUser.useQuery();
  const { isLoading: isAuthorLoading, data: author } =
    api.user.getUserById.useQuery({ id: authorId });
  const isOwnPost =
    !isCurrentUserLoading && currentUser ? currentUser.id === authorId : false;
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

  const renderPopupMenu = (() => {
    if (isOwnPost)
      return (
        <Menu>
          <MenuButton>
            <Icon as={BiDotsVerticalRounded} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={FaPenAlt} />} onClick={onEditOpen}>
              Edit post
            </MenuItem>
            <MenuItem icon={<Icon as={FaTrashAlt} />} onClick={onDeleteOpen}>
              Delete post
            </MenuItem>
          </MenuList>
        </Menu>
      );

    return null;
  })();

  return (
    <>
      <Box bg="white" rounded="lg" p="5" mb="5" shadow="sm">
        <HStack justifyContent="space-between">
          <HStack gap="md" mb="2">
            {isAuthorLoading ? (
              <Spinner size="md" />
            ) : (
              <>
                <Avatar name={author?.name} size="sm" bg="yellow.500" />
                <Text fontWeight="bold" color="blue.700">
                  {author?.name}
                </Text>
              </>
            )}
            <Text color="gray.800" fontSize="sm" fontWeight="md">
              {getRelativeTime(createdAt)}
            </Text>
          </HStack>

          {renderPopupMenu}
        </HStack>
        <Heading
          size="lg"
          _hover={{ color: "blue.600", cursor: "pointer" }}
          onClick={onDetailOpen}
          mb="2"
        >
          {title}
        </Heading>
        <Text noOfLines={isDetail ? 0 : 3}>{content}</Text>
      </Box>
      <EditPostFormModal
        isVisible={isEditOpen}
        handleClose={onEditClose}
        defaultValues={{ id, title, content }}
      />
      <DeletePostModal
        isVisible={isDeleteOpen}
        handleClose={onDeleteClose}
        id={id}
      />
      <PostDetailModal
        isVisible={isDetailOpen}
        handleClose={onDetailClose}
        id={id}
      />
    </>
  );
};

export default Post;
