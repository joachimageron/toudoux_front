"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input, Form, Textarea,
    Card,
    DatePicker,
    Select,
    SelectItem,
    Checkbox
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Categories, Category } from "@/utils/types/Category";
import { Task } from "@/utils/types/Task";
import { Icon } from "@iconify/react/dist/iconify.js";

type EditTaskModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    task: Task | null | undefined;
};




export default function CategoryContainer({ isOpen, onOpenChange, task }: EditTaskModalProps) {

    const [isLoading, setIsLoading] = useState(false);

    const defaultTitle = task?.title || "";
    const defaultDescription = task?.description || "";
    const defaultDueDate = task?.dueDate ? new Date(task.dueDate) : null;
    const defaultDone = task?.done || false;
    const defaultPriority = task?.priority || "medium";

    
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <Form validationBehavior="native">
                        <ModalHeader className="flex items-center gap-2">
                            <Icon icon="material-symbols:edit-rounded" width={24} />
                            <span>Edit Task</span>
                        </ModalHeader>
                        <ModalBody className="w-full space-y-4">
                            {/* Titre */}
                            <Input
                                isRequired
                                autoFocus
                                variant="bordered"
                                name="title"
                                label="Title"
                                className="w-full"
                                maxLength={50}
                                defaultValue={task?.title}
                            />

                            {/* Description */}
                            <Textarea
                                label="Description"
                                name="description"
                                variant="bordered"
                                className="w-full"
                                maxLength={250}
                                defaultValue={task?.description}
                            />

                            {/* Date d'échéance */}
                            <DatePicker
                                label="Due Date"
                                name="due_date"
                                variant="bordered"
                                className="w-full"
                            //defaultValue={task?.dueDate}
                            />

                            {/* Priorité */}
                            <Select
                                label="Priority"
                                name="priority"
                                variant="bordered"
                                className="w-full"
                                defaultSelectedKeys={[defaultPriority]}
                            >
                                <SelectItem key="low" value="low">
                                    Low
                                </SelectItem>
                                <SelectItem key="medium" value="medium">
                                    Medium
                                </SelectItem>
                                <SelectItem key="high" value="high">
                                    High
                                </SelectItem>
                            </Select>

                            {/* Statut (Done) */}
                            <Checkbox
                                name="done"
                                defaultSelected={defaultDone}
                                className="w-full"
                            >
                                Mark as completed
                            </Checkbox>
                        </ModalBody>
                        <ModalFooter className="flex justify-end w-full gap-2">
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" isLoading={isLoading}>
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
            </ModalContent>
        </Modal>
    );

}