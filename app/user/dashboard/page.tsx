import ClientView from "./ClientView";
import { fetchHabits } from "./actions";

export interface Habit {
  title: string;
  description: string;
  coins: number;
}

export interface HabitData {
    data: Habit[]
}

export default async function Page() {
    let data = await fetchHabits();
    return <ClientView data={data}/>
}