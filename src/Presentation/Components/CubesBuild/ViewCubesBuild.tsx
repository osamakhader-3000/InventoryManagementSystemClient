import { useContext, useEffect, useState } from "react";
import Build from "../../../Domain/Entities/Build";
import { DependencyContext } from "../../../context/DependencyContext";
import styles from "./CssStyles/ViewCubesBuild.module.css";
import { BackButton } from "../GeneralComponents/BackButton";

export default function ViewCubesBuild() {

    const { buildService } = useContext(DependencyContext);
    const [build, setBuild] = useState<Build | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBuild = async () => {
            const buildId = window.location.pathname.split("/").pop();
            if (!buildId) return;
            const fetchedBuild = await buildService.getBuild(buildId);

            setBuild(fetchedBuild);
            setIsLoading(false);
        };
        fetchBuild();
    }, []);

    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading cubes build ...</h3>
            </div>
        );

    if (!build)
        return (
            <div>
                <h3>Build not found</h3>
            </div>
        );

    return (
        <div className={styles.maincontainer}>

             <div className={styles.clientpagebuttonspanel}>
                <BackButton to={'../builds/'} />
            </div>
            
        <div className={styles.info}>
           
        
            <h3 className={styles.mainTitle}>{build.version}</h3>


            <div key={build.id} className={styles.buildcontainer}>

                <table className={styles.buildstable}>
                    <tbody>
                        <tr>
                            <td className={styles.buildTitleCell}>Build number of version:</td>
                            <td>{build.version}</td>
                        </tr>
                        <tr>
                            <td className={styles.buildTitleCell}>Link:</td>
                            <td className={styles.buildLinkCell}><a rel="noopener noreferrer" target="_blank" title={build.link} className={styles.buildlink} href={build.link && !/^https?:\/\//i.test(build.link) ? `https://${build.link}` : build.link}>{build.link}</a></td>
                        </tr>
                        <tr>
                            <td className={styles.buildTitleCell}>Updated At:</td>
                            <td>{build.updatedAt?.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className={styles.buildTitleCell}>Updated By:</td>
                            <td>{build.updatedBy}</td>
                        </tr>
                        <tr>
                            <td className={styles.buildTitleCell}>Clients who have the build:</td>
                            <td>{build.clients.map((client, index) => (
                                <div key={index} className={styles.buildItem}>
                                    <a href={`/viewcubesclient/${client.id}`} target="_blank" className={styles.clientLink}><span className={styles.clientName}>{client.name}</span></a>
                                </div>
                            ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}
