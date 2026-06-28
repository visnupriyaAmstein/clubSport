// Central configuration for each role — colors, menus, and labels
// To add a new role or change a color, only edit this file

export const ROLES_CONFIG = {
  user: {
    label: "Usuario",
    colors: {
      primary:    "#185FA5",
      secondary:  "#378ADD",
      light:      "#E6F1FB",
      text:       "#E6F1FB",
      textMuted:  "#B5D4F4",
      textDark:   "#0C447C",
    },
    menuItems: [
      { label: "Dashboard",        icon: "ti-layout-dashboard", path: "/user/dashboard" },
      { label: "Mis clases",       icon: "ti-calendar",         path: "/user/clases" },
      { label: "Clases disponibles", icon: "ti-list-search",    path: "/user/disponibles" },
    ],
  },

  coach: {
    label: "Coach",
    colors: {
      primary:    "#3B6D11",
      secondary:  "#639922",
      light:      "#EAF3DE",
      text:       "#EAF3DE",
      textMuted:  "#C0DD97",
      textDark:   "#27500A",
    },
    menuItems: [
      { label: "Dashboard",      icon: "ti-layout-dashboard", path: "/coach/dashboard" },
      { label: "Mis clases",     icon: "ti-calendar-event",   path: "/coach/clases" },
      { label: "Mis alumnos",    icon: "ti-users",            path: "/coach/alumnos" },
      { label: "Horarios",       icon: "ti-clock",            path: "/coach/horarios" },
    ],
  },

  admin: {
    label: "Administrador",
    colors: {
      primary:    "#854F0B",
      secondary:  "#BA7517",
      light:      "#FAEEDA",
      text:       "#FAEEDA",
      textMuted:  "#FAC775",
      textDark:   "#633806",
    },
    menuItems: [
      { label: "Dashboard", icon: "ti-layout-dashboard", path: "/admin/dashboard" },
      { label: "Usuarios",  icon: "ti-users",            path: "/admin/usuarios" },
      { label: "Coaches",   icon: "ti-whistle",          path: "/admin/coaches" },
      { label: "Clases",    icon: "ti-calendar-event",   path: "/admin/clases" },
    ],
  },
}
