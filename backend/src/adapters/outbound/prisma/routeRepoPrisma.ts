import { prisma } from "./prismaClient";
import { Route } from "../../../core/domain/Route";

export const routeRepo = {
  async getAll(): Promise<Route[]> {
    return prisma.route.findMany();
  },
  async setBaseline(id:string){
    // set all baseline false then set chosen true
    await prisma.route.updateMany({ where: {}, data: { isBaseline: false }});
    await prisma.route.update({ where: { id }, data: { isBaseline: true }});
  },
  async getById(id:string){
    return prisma.route.findUnique({ where:{ id }});
  }
};
