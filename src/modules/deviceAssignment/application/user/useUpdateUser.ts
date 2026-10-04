import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../context/DependencyContext";
import User, { type UserProps } from "../../domain/User";
import UserValidationError from "../../domain/UserValidationError";

export interface UpdateUserCommand extends UserProps {
    userId: string;
}

export function useUpdateUser() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateUser = useCallback(async ({ userId, ...changes }: UpdateUserCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await assignmentUserRepository.GetUser(BigInt(userId));
            if (!existing)
                throw new UserValidationError("The user no longer exists");

            const user = User.update(existing, changes);
            return await assignmentUserRepository.UpdateUser(user);
        } finally {
            setIsSaving(false);
        }
    }, [assignmentUserRepository]);

    return { updateUser, isSaving };
}
