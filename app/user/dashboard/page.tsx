import Dashboard from "./Dashboard";
import { fetchHabits } from "./actions";

export type Habit = {
  title: string;
  description: string;
  xp: number;
  coins: number;
}

export type UserData = {
  name: string
  xp: number
  level: number
  coins: number
  habits: Habit[]
}

export default async function Page() {
    let data = await fetchHabits();
    if (!data) return

    // TODO: Store user's coins, level etc and retrieve them
    let userData: UserData = {
      name: "Name",
      xp: 23,
      level: 3,
      coins: 55,
      habits: data
    }
    if (!data) data = []
    return <Dashboard user={userData}/>
}