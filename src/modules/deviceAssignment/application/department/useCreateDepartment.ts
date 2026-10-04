import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../context/DependencyContext";
import Department, { type DepartmentProps } from "../../domain/Department";

export type CreateDepartmentCommand = DepartmentProps;

export function useCreateDepartment() {
    const { departmentRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createDepartment = useCallback(async (command: CreateDepartmentCommand): Promise<boolean> => {
        const department = Department.create(command);

        setIsSaving(true);
        try {
            return await departmentRepository.CreateDepartment(department);
        } finally {
            setIsSaving(false);
        }
    }, [departmentRepository]);

    return { createDepartment, isSaving };
}
