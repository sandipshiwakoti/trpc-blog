import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import Post from "~/pages/home/components/Post";

import { api } from "~/utils/api";

interface PostDetailModalProps {
  isVisible: boolean;
  handleClose: () => void;
  id: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isVisible,
  handleClose,
  id,
}) => {
  const { isLoading, data: post } = api.post.getPostById.useQuery({ id });

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleClose}
      isCentered
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {!isLoading && post && (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              authorId={post.authorId}
              isDetail
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailModal;
