import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../context/DependencyContext";
import Assignment from "../../domain/Assignment";
import AssignmentValidationError from "../../domain/AssignmentValidationError";
import Device from "../../domain/Device";
import User from "../../domain/User";
import Accessory from "../../domain/Accessory";

export interface CreateAssignmentCommand {
    assignedUserId: string;
    deviceSerialNumber: string;
    remarks: string;
    accessoryIds?: number[];
}

export function useCreateAssignment() {
    const { assignmentRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createAssignment = useCallback(async (command: CreateAssignmentCommand): Promise<boolean> => {
        if (!command.assignedUserId)
            throw new AssignmentValidationError("An assignment must have a user");

        setIsSaving(true);
        try {
            const assignment = Assignment.create({
                assignedUser: User.fromId(command.assignedUserId),
                device: Device.fromSerialNumber(command.deviceSerialNumber),
                remarks: command.remarks,
                accessories: command.accessoryIds?.map(id => Accessory.fromId(id)) ?? []
            });
            return await assignmentRepository.CreateAssignment(assignment);
        } finally {
            setIsSaving(false);
        }
    }, [assignmentRepository]);

    return { createAssignment, isSaving };
}
