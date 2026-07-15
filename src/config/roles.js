// src/config/roles.js
export const ROLES_CONFIG = {
  user: {
    label: "Usuario",
    colors: {
      bg:        "#0B1F1F",
      surface:   "rgba(255,255,255,0.05)",
      border:    "rgba(255,255,255,0.08)",
      primary:   "#138690",
      secondary: "#22B6C2",
      light:     "#E1F5EE",
      text:      "#C9DCDC",
      textMuted: "#8FB3B3",
      textDark:  "#085041",
    },
    menuItems: [
      { label: "Dashboard",          icon: "ti-layout-dashboard", path: "/user/dashboard" },
      { label: "Clases disponibles", icon: "ti-list-search",      path: "/user/disponibles" },
      { label: "Mis reservas",       icon: "ti-calendar",         path: "/user/reservas" },
    ],
  },

  coach: {
    label: "Coach",
    colors: {
      bg:        "#0A1A0D",          
      surface:   "rgba(255,255,255,0.05)",
      border:    "rgba(255,255,255,0.08)",
      primary:   "#2E7D32",         
      secondary: "#43A047",          
      light:     "#E8F5E9",
      text:      "#C8DBC9",
      textMuted: "#8BAE8C",
      textDark:  "#1B5E20",
    },
    menuItems: [
      { label: "Dashboard",  icon: "ti-layout-dashboard", path: "/coach/dashboard" },
      { label: "Mis clases", icon: "ti-calendar-event",   path: "/coach/clases" },
      { label: "Mi horario", icon: "ti-clock",            path: "/coach/horarios" },
    ],
  },

  admin: {
    label: "Administrador",
    colors: {
      bg:        "#241712",
      surface:   "rgba(255,255,255,0.05)",
      border:    "rgba(255,255,255,0.08)",
      primary:   "#CB6C32",
      secondary: "#E58A52",
      light:     "#FAEEDA",
      text:      "#E3D2C8",
      textMuted: "#C2A294",
      textDark:  "#633806",
    },
    menuItems: [
      { label: "Dashboard",     icon: "ti-layout-dashboard", path: "/admin/dashboard" },
      { label: "Usuarios",      icon: "ti-users",            path: "/admin/usuarios" },
      { label: "Salas",         icon: "ti-building",         path: "/admin/salas" },
      { label: "Deportes",      icon: "ti-whistle",          path: "/admin/deportes" },
      { label: "Horarios",      icon: "ti-calendar-event",   path: "/admin/horarios" },
      { label: "Asignaciones",  icon: "ti-clipboard-list",   path: "/admin/asignaciones" },
    ],
  },
}
