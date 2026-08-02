const relativeFormatter = new Intl.RelativeTimeFormat("es-AR", {
  numeric: "auto",
});

export function formatUserName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}

export function formatUserLastActive(value?: string) {
  if (!value) {
    return "Todavía no ingresó";
  }

  const differenceInMinutes = Math.round(
    (new Date(value).getTime() - Date.now()) / 60_000,
  );

  if (Math.abs(differenceInMinutes) < 60) {
    return relativeFormatter.format(differenceInMinutes, "minute");
  }

  const differenceInHours = Math.round(differenceInMinutes / 60);
  if (Math.abs(differenceInHours) < 24) {
    return relativeFormatter.format(differenceInHours, "hour");
  }

  return relativeFormatter.format(Math.round(differenceInHours / 24), "day");
}
