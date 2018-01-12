import { Filters } from "./filters";

export interface IScraper{
    scrap(filters:Filters) : void;
}