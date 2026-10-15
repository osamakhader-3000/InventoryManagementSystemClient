import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Location, { type LocationProps } from "../../domain/Location";

export type CreateLocationCommand = LocationProps;

export function useCreateLocation() {
    const { locationRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createLocation = useCallback(async (command: CreateLocationCommand): Promise<boolean> => {
        const location = Location.create(command);

        setIsSaving(true);
        try {
            return await locationRepository.CreateLocation(location);
        } finally {
            setIsSaving(false);
        }
    }, [locationRepository]);

    return { createLocation, isSaving };
}
