import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Assignment from "../../domain/Assignment";
import AssignmentValidationError from "../../domain/AssignmentValidationError";
import Device from "../../domain/Device";
import User from "../../domain/User";
import Accessory from "../../domain/Accessory";

export interface UpdateAssignmentCommand {
    assignmentId: bigint;
    assignedUserId: string;
    deviceSerialNumber: string;
    remarks: string;
    accessoryIds?: number[];
}

export function useUpdateAssignment() {
    const { assignmentRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateAssignment = useCallback(async (command: UpdateAssignmentCommand): Promise<boolean> => {
        if (!command.assignedUserId)
            throw new AssignmentValidationError("An assignment must have a user");

        setIsSaving(true);
        try {
            const existing = await assignmentRepository.GetAssignment(command.assignmentId);
            if (!existing)
                throw new AssignmentValidationError("The assignment no longer exists");

            const assignedUser = existing.assignedUser.id === command.assignedUserId
                ? existing.assignedUser
                : User.fromId(command.assignedUserId);

            const device = existing.device.serialNumber === command.deviceSerialNumber.trim()
                ? existing.device
                : Device.fromSerialNumber(command.deviceSerialNumber);

            const assignment = Assignment.update(existing, {
                assignedUser,
                device,
                remarks: command.remarks,
                accessories: command.accessoryIds?.map(id => Accessory.fromId(id)) ?? []
            });
            return await assignmentRepository.UpdateAssignment(assignment);
        } finally {
            setIsSaving(false);
        }
    }, [assignmentRepository]);

    return { updateAssignment, isSaving };
}
