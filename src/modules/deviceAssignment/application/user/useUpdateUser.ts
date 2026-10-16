import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import User, { type UserProps } from "../../domain/User";

export interface UpdateUserCommand extends UserProps {
    userId: string;
}

export function useUpdateUser() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateUser = useCallback(async ({ userId, ...changes }: UpdateUserCommand): Promise<boolean> => {
        const user = User.update(userId, changes);

        setIsSaving(true);
        try {
            return await assignmentUserRepository.UpdateUser(user);
        } finally {
            setIsSaving(false);
        }
    }, [assignmentUserRepository]);

    return { updateUser, isSaving };
}
