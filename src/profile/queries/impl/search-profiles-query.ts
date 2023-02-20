import { IQuery } from "@nestjs/cqrs";
import { InputSearchDto } from "src/profile/dtos/input-search-dto";

export class SearchProfilesQuery implements IQuery {
    constructor(public readonly search: InputSearchDto) {}
}