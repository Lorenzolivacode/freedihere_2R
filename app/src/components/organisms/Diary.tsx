import { useState } from "react";
import { WeekCalendar } from "../molecules/WeekCalendar";
import { PeriodSelect } from "../molecules/PeriodSelect";
import { DiaryCard } from "../molecules/DiaryCard";
import { GiornataComponent } from "../molecules/GiornataComponent";
import { MealModal } from "./MealModal";
import { Modal } from "../atoms/Modal";
import { DatePicker } from "../atoms/DatePicker";
import { Spinner } from "../atoms/Spinner";
import { useDiary } from "../../utils/hooks/useDiary";
import { useMeal } from "../../utils/hooks/useMeal";
import type { IDiaryUser } from "../../types/diary.types";
import { getActiveUser } from "../../utils/session";

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Calcola from/to per un periodo rispetto alla data selezionata
function getPeriodRange(date: string, period: "week" | "month" | "year"): { from: string; to: string } {
  const d = new Date(date);
  if (period === "week") {
    const day = d.getDay();
    const mon = new Date(d);
    mon.setDate(d.getDate() - ((day + 6) % 7));
    const sun = new Date(mon);
    sun.setDate(mon.getDate() + 6);
    return { from: toYMD(mon), to: toYMD(sun) };
  }
  if (period === "month") {
    const from = new Date(d.getFullYear(), d.getMonth(), 1);
    const to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return { from: toYMD(from), to: toYMD(to) };
  }
  // year
  const from = new Date(d.getFullYear(), 0, 1);
  const to = new Date(d.getFullYear(), 11, 31);
  return { from: toYMD(from), to: toYMD(to) };
}

export function Diary() {
  const today = toYMD(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const [selectedDiary, setSelectedDiary] = useState<IDiaryUser | null>(null);
  const [mealModalOpen, setMealModalOpen] = useState(false);

  const userId = getActiveUser() ?? "";
  const { diaries, loadingPeriod, getDiariesByPeriod } = useDiary();
  const { loadingCreate, createMeal } = useMeal();

  // Carica le diary del periodo quando cambia data o periodo
  const loadPeriod = (date: string, p: typeof period) => {
    const range = getPeriodRange(date, p);
    getDiariesByPeriod(userId, range.from, range.to);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    loadPeriod(date, period);
  };

  const handlePeriodChange = (p: "week" | "month" | "year") => {
    setPeriod(p);
    loadPeriod(selectedDate, p);
  };

  const handleCardClick = (diary: IDiaryUser) => {
    setSelectedDiary(diary);
  };

  const handleConfirmMeal = async (
    mealName: string,
    foods: { id_detail: string; weight: number }[]
  ) => {
    if (!selectedDiary) return;
    await createMeal(mealName, selectedDiary.id, foods);
    setMealModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
      <h1 className="section-title">Diario</h1>

      {/* Selezione data */}
      <WeekCalendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <div className="grid grid-cols-2 gap-2">
        <DatePicker value={selectedDate} onChange={handleDateChange} />
        <PeriodSelect value={period} onChange={handlePeriodChange} />
      </div>

      {/* Lista diary */}
      {loadingPeriod ? (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      ) : diaries.length === 0 ? (
        <div className="card text-center py-8 opacity-40">
          <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
            Nessuna voce nel periodo selezionato
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {diaries.map((diary) => (
            <DiaryCard
              key={diary.id}
              diary={diary}
              onClick={() => handleCardClick(diary)}
            />
          ))}
        </div>
      )}

      {/* Modale dettaglio diary */}
      <Modal
        isOpen={!!selectedDiary}
        onClose={() => setSelectedDiary(null)}
        title={selectedDiary ? new Date(selectedDiary.day).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" }) : ""}
      >
        {selectedDiary && (
          <GiornataComponent
            date={new Date(selectedDiary.day)}
            meals={selectedDiary.meals}
            onAddMeal={() => setMealModalOpen(true)}
            onEditMeal={() => setMealModalOpen(true)}
          />
        )}
      </Modal>

      {selectedDiary && (
        <MealModal
          isOpen={mealModalOpen}
          onClose={() => setMealModalOpen(false)}
          date={selectedDiary.day}
          onConfirm={handleConfirmMeal}
          loading={loadingCreate}
        />
      )}
    </div>
  );
}
