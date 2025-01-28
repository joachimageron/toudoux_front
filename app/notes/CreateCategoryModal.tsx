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
import {useRouter} from "next/navigation";
import {Categories, Category} from "@/utils/types/Category";


type CreatePostButtonProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  setCategories: React.Dispatch<React.SetStateAction<Categories | undefined>>
}

export default function CreateCategoryModal({isOpen, onOpenChange, setCategories}: Readonly<CreatePostButtonProps>)
{
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    
    const category = await addCategory(
      formData.get("name") as string,
      formData.get("description") as string,
      formData.get("color") as string
    );
    
    setIsLoading(false);
    if (!category) return;
setCategories((categories) => {
  if (categories) {
    return {
      ...categories,
      member: [...categories.member, category]
    };
  }
  return categories;
});
    
    onOpenChange()
    toast.success("Category created successfully");
  }
  
  const addCategory = async (name: string, description: string, color: string) => {
    const token = sessionStorage.getItem("token");
    
    const body = JSON.stringify({name, description, color});
    const response = await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
        "Authorization": `Bearer ${token}`
      },
      body: body
    });
    
    if (response.ok) {
      onOpenChange()
      return response.json() as Promise<Category>;
    }
    else if (response.status === 401) {
      toast.error("Unauthorized");
      window.sessionStorage.removeItem("token");
      router.push("auth/signin");
    }
    else {
      toast.error("An error occurred");
    }
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
              <Input
                label={"Color"}
                name={"color"}
                variant="bordered"
                className={"w-full"}
                maxLength={7}
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