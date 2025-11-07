// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";    

// 1. Importar las vistas
import DashboardView from "@/views/DashboardView.vue";
// import MessagesView from "@/views/MessagesView.vue"; // <-- Ya no la usamos
import ExamenView from "@/views/ExamenView.vue"; // <-- IMPORTAMOS LA NUEVA VISTA
import ProfileView from "@/views/ProfileView.vue";
import UpdatesView from "@/views/UpdatesView.vue";

const router = createRouter({
    history: createWebHistory(),
    // 2. Definir las 4 rutas
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: DashboardView,
        },
        {
            path: "/examen", // <-- CAMBIAMOS LA RUTA
            name: "examen",   // <-- CAMBIAMOS EL NOMBRE
            component: ExamenView, // <-- APUNTAMOS AL NUEVO COMPONENTE
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
        },
        {
            path: "/updates",
            name: "updates",
            component: UpdatesView,
        },
        // 3. Ruta "catch-all"
        {
            path: "/:pathMatch(.*)*",
            redirect: "/",
        },

        {
            path: "/messages",
            name: "messages",
            // component: MessagesView, // <-- COMENTAMOS ESTA LÍNEA
            // CARGA PEREZOSA DE LA VISTA DE MENSAJES
            component: () => import("@/views/MessagesView.vue"),
        }
    ],
})
  
export default router;