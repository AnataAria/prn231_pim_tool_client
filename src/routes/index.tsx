// routesConfig.ts
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ManagerLayout from "../pages/manager/layout";
import NotFoundPage from "../pages/common/NotFoundPage";
import ProjectList from "../pages/manager/project/ProjectList";
import ProjectPage from "../pages/manager/project/ProjectModified";

// Lazy loading components
const LoginPage = lazy(() => import("../pages/login/index"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/admin",
        element: <ManagerLayout/>,
        children: [
            {
                path: "/admin",
                element: <ProjectList/>
            },
            {
                path: "/admin/projects",
                element: <ProjectList/>
            },
            {
                path: "/admin/projects/:projectId",
                element: <ProjectPage/>
            }
        ]   
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
]);

export default routes;
