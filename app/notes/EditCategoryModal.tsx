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
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Categories | undefined>>
}

export default function EditCategoryModal({
  isOpen,
  onOpenChange,
  category,
  setCategories
}: Readonly<CreatePostButtonProps>) {
  const router = useRouter();
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  
  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    setIsDeleteLoading(true);
    const response = await fetch(`http://localhost:8000/api/categories/${category.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/ld+json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      setCategories((categories) => {
        if (categories) {
          return {
            ...categories,
            member: categories.member.filter(cat => cat.id !== category.id)
          };
        }
        return categories;
      });
      onOpenChange()
      toast.success("Category deleted successfully");
    } else if (response.status === 401) {
      toast.error("Unauthorized");
      window.sessionStorage.removeItem("token");
      router.push("auth/signin");
    } else {
      toast.error("An error occurred");
    }
    setIsDeleteLoading(false);
  }
  
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditLoading(true);
    
    const formData = new FormData(event.currentTarget);
    
    const category = await editCategory(
      formData.get("name") as string,
      formData.get("description") as string,
      formData.get("color") as string
    );
    
    setIsEditLoading(false);
    if (!category) return;
    setCategories((categories) => {
      if (categories) {
        return {
          ...categories,
          member: categories.member.map(cat => cat.id === category.id ? category : cat)
        };
      }
      return categories;
    });
    
    onOpenChange()
    toast.success("Category updated successfully");
  }
  
  const editCategory = async (name: string, description: string, color: string) => {
    const token = sessionStorage.getItem("token");
    
    const body = JSON.stringify({name, description, color});
    console.log(body)
    const response = await fetch(`http://localhost:8000/api/categories/${category.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        "Authorization": `Bearer ${token}`
      },
      body: body
    });
    
    if (response.ok) {
      onOpenChange()
      return response.json() as Promise<Category>;
    } else if (response.status === 401) {
      toast.error("Unauthorized");
      window.sessionStorage.removeItem("token");
      router.push("auth/signin");
    } else {
      toast.error("An error occurred");
    }
  }
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <Form validationBehavior="native" onSubmit={handleForm}>
          <ModalHeader className="">Edit category</ModalHeader>
          <ModalBody className={'w-full'}>
            <Input
              isRequired
              autoFocus
              variant="bordered"
              name={"name"}
              label={"Name"}
              className={"w-full"}
              maxLength={50}
              defaultValue={category.name}
            />
            <Textarea
              label={"Description"}
              name={"description"}
              variant="bordered"
              className={"w-full"}
              maxLength={250}
              defaultValue={category.description}
            />
            <Input
              label={"Color"}
              name={"color"}
              variant="bordered"
              className={"w-full"}
              maxLength={7}
              defaultValue={category.color}
            />
          </ModalBody>
          <ModalFooter className={'flex justify-end w-full'}>
            <Button isLoading={isDeleteLoading} color="danger" onPress={handleDelete}>
              Delete
            </Button>
            <Button isLoading={isEditLoading} color="primary" type={"submit"}>
              Save
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
}