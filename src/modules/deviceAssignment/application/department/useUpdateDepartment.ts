import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Department, { type DepartmentProps } from "../../domain/Department";

export interface UpdateDepartmentCommand extends DepartmentProps {
    departmentId: string;
}

export function useUpdateDepartment() {
    const { departmentRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateDepartment = useCallback(async ({ departmentId, ...changes }: UpdateDepartmentCommand): Promise<boolean> => {
        const department = Department.update(departmentId, changes);

        setIsSaving(true);
        try {
            return await departmentRepository.UpdateDepartment(department);
        } finally {
            setIsSaving(false);
        }
    }, [departmentRepository]);

    return { updateDepartment, isSaving };
}
