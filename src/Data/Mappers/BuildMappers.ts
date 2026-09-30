import Build from "../../Domain/Entities/Build";

export class BuildMapper {

    static ToDomain(buildDto: any): Build {
        return new Build(
            buildDto.id,
            buildDto.version,
            buildDto.link,
            buildDto.clients,
            buildDto.updatedAt ? new Date(buildDto.updatedAt) : null,
            buildDto.updatedBy
        );
    }

    static ToDomainList(buildDtos: any[]): Build[] {
        return buildDtos.map(buildDto => this.ToDomain(buildDto));
    }

}