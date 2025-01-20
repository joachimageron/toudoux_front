'use client';
import {Button, Checkbox, Skeleton, useDisclosure} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import CategoryModal from "@/app/notes/CreateCategoryModal";
import React from "react";
import {Categories} from "@/utils/types/Category";
import {Card, CardBody} from "@nextui-org/card";

type SideBarProps = {
  categories: Categories | undefined
  setCategories: React.Dispatch<React.SetStateAction<Categories | undefined>>
}

export default function SideBar({categories, setCategories}: Readonly<SideBarProps>) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <aside className={"p-5"}>
      <CategoryModal isOpen={isOpen} onOpenChange={onOpenChange} setCategories={setCategories}/>
      <Button color={'primary'} variant={'shadow'} className={"w-full"} onPress={() => onOpen()}>
        <Icon className={"text-xl"} icon={"mage:home-plus-fill"}/>
        Category
      </Button>
      <Skeleton className="rounded-lg mt-4 min-w-44 min-h-20" isLoaded={!!categories}>
        <Card className={''}>
          <CardBody className={'w-fit '}>
            <ul className={'flex flex-col gap-3'}>
              {categories?.member.map((category) => (
                <li key={category.id} className={'flex'}>
                  <Checkbox isSelected={true}/>
                  <p className="whitespace-nowrap">
                    {category.name}
                  </p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </Skeleton>
    </aside>
  );
}