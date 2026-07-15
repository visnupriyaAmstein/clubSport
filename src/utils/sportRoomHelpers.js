export function resolveSportName(node) {
  return node?.sport?.name ?? node?.sport_name ?? "—"
}

export function resolveRoomName(node) {
  return node?.room?.name ?? node?.room_name ?? "—"
}

export function resolveCoachLabel(node) {
  const coach = node?.coach
  if (coach) return coach.full_name || coach.email || "Coach"
  return node?.coach_name ?? "—"
}

export function getAssignmentNodeFromSchedule(schedule) {
  return schedule?.sportRoom ?? schedule?.sport_room ?? schedule
}
