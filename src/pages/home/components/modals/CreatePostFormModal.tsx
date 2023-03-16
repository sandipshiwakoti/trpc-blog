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

interface CreatePostFormModalProps {
  isVisible: boolean;
  handleClose: () => void;
}

const CreatePostFormModal: React.FC<CreatePostFormModalProps> = ({
  isVisible,
  handleClose,
}) => {
  const utils = api.useContext();
  const toast = useToast();
  const postSchema = z.object({
    title: z.string(),
    content: z.string(),
  });
  type PostSchema = z.infer<typeof postSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const { isLoading, mutate: createPost } = api.post.createPost.useMutation({
    onSuccess: async () => {
      await utils.post.posts.invalidate();
      handleClose();
      reset({ title: "", content: "" });
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
    createPost(data);
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
          <ModalHeader>Create Post</ModalHeader>
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
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostFormModal;
