import { CubesBuildForm } from "./CubesBuildForm";
import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Build from "../../../Domain/Entities/Build";
import styles from "./CssStyles/EditCubesBuild.module.css";


export default function EditCubesBuild() {

    const { buildService } = useContext(DependencyContext);
    const [build, setBuild] = useState<Build | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBuild = async () => {
            const buildId = window.location.pathname.split("/").pop();
            if (!buildId) return;

            const result = await buildService.getBuild(buildId);
            setIsLoading(false);
            setBuild(result);            
        };
        fetchBuild();
    }, []);

    if (isLoading)
        return (
            <div className={styles.messagecontainer}>
                <h3>Please wait</h3>
                <h3>Loading build ...</h3>
            </div>
        );

    return <CubesBuildForm build={build} editMode={true} />;
}