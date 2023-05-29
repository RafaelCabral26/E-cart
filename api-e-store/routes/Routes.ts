import { Router } from "express";
import {router as UserRoutes} from "../routes/UserRoute"
import {router as ProductRoute } from '../routes/ProductsRoute'
export const allRoutes = Router().use(UserRoutes, ProductRoute)