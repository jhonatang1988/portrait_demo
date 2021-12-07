import type { NextPage } from 'next'
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { PlanetType } from './components/Planets'
import { Search } from './components/Search'


interface PlanetsContextType {
  planets: PlanetType[];
  setPlanets: Dispatch<SetStateAction<PlanetType[]>>;
  preservedPlanets: PlanetType[];
  setPreservedPlanets: Dispatch<SetStateAction<PlanetType[]>>;
}

const initialContextData:PlanetsContextType = { planets: [], setPlanets: () => {}, preservedPlanets: [], setPreservedPlanets: () => {}}

export const PlanetContext = createContext<PlanetsContextType>(initialContextData)

const Home: NextPage = () => {
  const [planets, setPlanets] = useState<PlanetType[]>([])
  const [preservedPlanets, setPreservedPlanets] = useState<PlanetType[]>([])
  return (
    <div>
      <PlanetContext.Provider value={{ planets, setPlanets, preservedPlanets, setPreservedPlanets}}>
        <Search />
      </PlanetContext.Provider>
    </div>
  )
  
}
export default Home