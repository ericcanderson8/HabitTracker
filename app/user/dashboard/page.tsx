import ClientView from "./ClientView";
import { fetchHabits } from "./actions";

export type Habit = {
  title: string;
  description: string;
  xp: number;
  coins: number;
}

export type HabitData = {
    data: Habit[]
}

export default async function Page() {
    let data = await fetchHabits();
    if (!data) data = []
    return <ClientView data={data}/>
}