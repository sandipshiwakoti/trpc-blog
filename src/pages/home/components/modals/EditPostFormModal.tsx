import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";

interface EditPostFormModalProps {
  isVisible: boolean;
  handleClose: () => void;
  defaultValues: {
    id: string;
    title: string;
    content: string;
  };
}

const EditPostFormModal: React.FC<EditPostFormModalProps> = ({
  isVisible,
  handleClose,
  defaultValues,
}) => {
  const utils = api.useContext();
  const toast = useToast();
  const postSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  });
  type PostSchema = z.infer<typeof postSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const { isLoading, mutate: editPost } = api.post.editPost.useMutation({
    onSuccess: async () => {
      await utils.post.posts.invalidate();
      handleClose();
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

  const onSubmit = (data: PostSchema) => {
    editPost(data);
  };

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={handleClose}
        isCentered
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Title" {...register("title")} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Content"
                {...register("content")}
                rows={8}
              />
              <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit(onSubmit)}
            >
              Edit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPostFormModal;
