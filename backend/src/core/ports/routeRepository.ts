import { Route } from "../domain/Route";
export interface RouteRepository {
  getAll(): Promise<Route[]>;
  setBaseline(id:string): Promise<void>;
  getById(id:string): Promise<Route | null>;
}
