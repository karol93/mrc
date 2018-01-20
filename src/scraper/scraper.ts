import { Filters } from './../shared/filters';

export interface IScraper{
    scrap(filters:Filters) : void;
}