import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Department, { type DepartmentProps } from "../../domain/Department";
import DepartmentValidationError from "../../domain/DepartmentValidationError";

export interface UpdateDepartmentCommand extends DepartmentProps {
    departmentId: string;
}

export function useUpdateDepartment() {
    const { departmentRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateDepartment = useCallback(async ({ departmentId, ...changes }: UpdateDepartmentCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await departmentRepository.GetDepartment(departmentId);
            if (!existing)
                throw new DepartmentValidationError("The department no longer exists");

            const department = Department.update(existing, changes);
            return await departmentRepository.UpdateDepartment(department);
        } finally {
            setIsSaving(false);
        }
    }, [departmentRepository]);

    return { updateDepartment, isSaving };
}
