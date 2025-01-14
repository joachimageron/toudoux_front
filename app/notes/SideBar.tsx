'use client';
import {Button, useDisclosure} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import CategoryModal from "@/app/notes/CategoryModal";


export default function SideBar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <aside className={"p-5"}>
      <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange}/>
      <Button className={""} onPress={()=>onOpen()}>
        <Icon className={"text-xl"} icon={"mage:home-plus-fill"}/>
        Category
      </Button>
    </aside>
  );
}