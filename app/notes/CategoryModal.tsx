"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input, Form, Textarea
} from "@nextui-org/react";
import React, {useState} from "react";
import toast from "react-hot-toast";

export default function CreatePostButton({isOpen, onOpenChange}: Readonly<{
  isOpen: boolean,
  onOpenChange: () => void;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      setIsLoading(false);
      return;
    }
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as FormDataEntryValue;
    const description = formData.get("description");
    
    console.log({name, description})
    
    onOpenChange()
    setIsLoading(false);
    toast.success("Category created successfully");
  }
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <Form validationBehavior="native" onSubmit={handleForm}>
            <ModalHeader className="">New category</ModalHeader>
            <ModalBody className={'w-full'}>
              <Input
                isRequired
                autoFocus
                variant="bordered"
                name={"name"}
                label={"Name"}
                className={"w-full"}
                maxLength={50}
              />
              <Textarea
                label={"Description"}
                name={"description"}
                variant="bordered"
                className={"w-full"}
                maxLength={250}
              />
            
            </ModalBody>
            <ModalFooter className={'flex justify-end w-full'}>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button isLoading={isLoading} color="primary" type={"submit"}>
                Create
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}