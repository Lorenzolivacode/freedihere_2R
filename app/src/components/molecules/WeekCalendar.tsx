type WeekCalendarProps = {
  selectedDate: string; // formato YYYY-MM-DD
  onDateChange: (date: string) => void;
};

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Costruisce i 7 giorni della settimana corrente (lunedì → domenica)
function getWeekDays(referenceDate: string): Date[] {
  const ref = new Date(referenceDate);
  const day = ref.getDay(); // 0=dom, 1=lun, ...
  const monday = new Date(ref);
  monday.setDate(ref.getDate() - ((day + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

const dayLabels = ["L", "M", "M", "G", "V", "S", "D"];

export function WeekCalendar({ selectedDate, onDateChange }: WeekCalendarProps) {
  const today = toYMD(new Date());
  const weekDays = getWeekDays(selectedDate);

  return (
    <div className="flex gap-1">
      {weekDays.map((date, i) => {
        const ymd = toYMD(date);
        const isSelected = ymd === selectedDate;
        const isToday = ymd === today;

        return (
          <button
            key={ymd}
            type="button"
            onClick={() => onDateChange(ymd)}
            className="flex flex-col items-center gap-0.5 flex-1 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: isSelected
                ? "var(--color-primary)"
                : isToday
                ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
                : "transparent",
              color: isSelected ? "var(--color-black)" : "var(--color-foreground)",
            }}
          >
            <span className="opacity-60">{dayLabels[i]}</span>
            <span>{date.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}
