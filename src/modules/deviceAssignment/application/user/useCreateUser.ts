import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import User, { type UserProps } from "../../domain/User";

export type CreateUserCommand = UserProps;

export function useCreateUser() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createUser = useCallback(async (command: CreateUserCommand): Promise<boolean> => {
        const user = User.create(command);

        setIsSaving(true);
        try {
            return await assignmentUserRepository.CreateUser(user);
        } finally {
            setIsSaving(false);
        }
    }, [assignmentUserRepository]);

    return { createUser, isSaving };
}
