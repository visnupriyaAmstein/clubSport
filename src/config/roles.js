export const ROLES_CONFIG = {
  user: {
    label: "Usuario",
    colors: {
      bg:        "#0B1F1F",   // dark teal bg
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
      { label: "Mis clases",         icon: "ti-calendar",         path: "/user/clases" },
      { label: "Clases disponibles", icon: "ti-list-search",      path: "/user/disponibles" },
    ],
  },

  coach: {
    label: "Coach",
    colors: {
      bg:        "#0F2418",   // dark green bg
      surface:   "rgba(255,255,255,0.05)",
      border:    "rgba(255,255,255,0.08)",
      primary:   "#4ADE80",
      secondary: "#86EFAC",
      light:     "#EAF3DE",
      text:      "#C9D6CD",
      textMuted: "#9BB0A4",
      textDark:  "#27500A",
    },
    menuItems: [
      { label: "Dashboard",   icon: "ti-layout-dashboard", path: "/coach/dashboard" },
      { label: "Mis clases",  icon: "ti-calendar-event",   path: "/coach/clases" },
      { label: "Mis alumnos", icon: "ti-users",            path: "/coach/alumnos" },
      { label: "Horarios",    icon: "ti-clock",            path: "/coach/horarios" },
    ],
  },

  admin: {
    label: "Administrador",
    colors: {
      bg:        "#241712",   // dark terracota bg
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
      { label: "Dashboard", icon: "ti-layout-dashboard", path: "/admin/dashboard" },
      { label: "Usuarios",  icon: "ti-users",            path: "/admin/usuarios" },
      { label: "Coaches",   icon: "ti-whistle",          path: "/admin/coaches" },
      { label: "Clases",    icon: "ti-calendar-event",   path: "/admin/clases" },
    ],
  },
}
