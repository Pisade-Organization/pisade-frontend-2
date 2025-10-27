export function getTimezones() {
  return Intl.supportedValuesOf("timeZone").map(tz => {
    const now = new Date();

    // offset in minutes
    const match = new Date().toLocaleString("en-US", { timeZone: tz, timeZoneName: "short" })
      .match(/GMT([+-]\d+)?/);
    const offset: any = match?.[1] ? -match[1] : 0;

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortOffset"
    });

    const parts = formatter.formatToParts(now);
    const gmt = parts.find(p => p.type === "timeZoneName")?.value.replace("UTC", "GMT");

    return {
      value: tz,
      label: `${tz} ${gmt}`
    };
  });
}

