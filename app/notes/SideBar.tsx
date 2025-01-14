'use client';
import {Button, useDisclosure} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import CategoryModal from "@/app/notes/CreateCategoryModal";
import React from "react";
import {Categories} from "@/utils/types/Category";

type SideBarProps = {
  setCategories: React.Dispatch<React.SetStateAction<Categories | undefined>>
}

export default function SideBar({setCategories}: Readonly<SideBarProps>) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <aside className={"p-5"}>
      <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} setCategories={setCategories}/>
      <Button className={""} onPress={()=>onOpen()}>
        <Icon className={"text-xl"} icon={"mage:home-plus-fill"}/>
        Category
      </Button>
    </aside>
  );
}