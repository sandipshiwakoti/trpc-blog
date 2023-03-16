import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";

import { api } from "~/utils/api";

interface DeletePostModalProps {
  isVisible: boolean;
  handleClose: () => void;
  id: string;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isVisible,
  handleClose,
  id,
}) => {
  const toast = useToast();
  const utils = api.useContext();

  const { isLoading, mutate: deletePost } = api.post.deletePost.useMutation({
    onSuccess: async () => {
      await utils.post.posts.invalidate();
    },
    onError: ({ message }) => {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleConfirm = () => {
    deletePost({ id });
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalHeader>Delete post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">Are you sure you want to delete this post?</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePostModal;
