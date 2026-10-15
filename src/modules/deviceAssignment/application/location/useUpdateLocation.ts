import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Location, { type LocationProps } from "../../domain/Location";
import LocationValidationError from "../../domain/LocationValidationError";

export interface UpdateLocationCommand extends LocationProps {
    locationId: string;
}

export function useUpdateLocation() {
    const { locationRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateLocation = useCallback(async ({ locationId, ...changes }: UpdateLocationCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await locationRepository.GetLocation(locationId);
            if (!existing)
                throw new LocationValidationError("The location no longer exists");

            const location = Location.update(existing, changes);
            return await locationRepository.UpdateLocation(location);
        } finally {
            setIsSaving(false);
        }
    }, [locationRepository]);

    return { updateLocation, isSaving };
}
