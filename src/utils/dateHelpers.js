export const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 7, label: "Domingo" },
]

const DAY_LABELS_BY_VALUE = Object.fromEntries(DAYS.map((d) => [d.value, d.label]))
const LEGACY_STRING_LABELS = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
}

export function getDayLabel(dayOfWeek) {
  if (dayOfWeek === null || dayOfWeek === undefined) return "—"
  if (DAY_LABELS_BY_VALUE[dayOfWeek]) return DAY_LABELS_BY_VALUE[dayOfWeek]
  if (LEGACY_STRING_LABELS[dayOfWeek]) return LEGACY_STRING_LABELS[dayOfWeek]
  return String(dayOfWeek)
}
