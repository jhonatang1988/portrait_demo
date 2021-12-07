import { useForm } from "react-hook-form";
import { useEffect, useState, createContext, Dispatch, SetStateAction, useContext } from 'react';
import useSWR from 'swr';
import { PlanetContext } from '../../index';
import { Planets, PlanetType } from '../Planets'

interface PlanetsApi {
    results: PlanetType[]
}

const fetcher = (input: RequestInfo, init: RequestInit) => fetch(input, init).then(res => res.json());

const usePlanets = (planetQuery: string, preservedPlanets: PlanetType[], setPlanets: Dispatch<SetStateAction<PlanetType[]>>) => {
    const { data, error } = useSWR<PlanetsApi>(`https://swapi.dev/api/planets?search=${planetQuery}`, fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
  }


export const Search = () => {
    const { register, watch } = useForm();
    const planetInput = watch('planetQuery')
    const [planetQuery, setPlanetQuery] = useState<string>(planetInput)
    const { planets, setPlanets, preservedPlanets } = useContext(PlanetContext);
    
    const { data, isLoading, isError } = usePlanets(planetQuery, preservedPlanets, setPlanets);
    
    useEffect(() => {
      let timeout: number;
      if (planetInput) {
        timeout = window.setTimeout(() => {
          setPlanetQuery(planetInput);
        }, 500)
      } else {
        setPlanetQuery(planetInput);
      }

      if (data) {
        setPlanets(data.results.filter((planet: PlanetType) => {
            return !preservedPlanets.map(pplanet => pplanet.url).includes(planet.url);
        }))
        }
  
      return () => {
        if (timeout) {
          clearTimeout(timeout)
        }
      }
  
  
    }, [data, planetInput, preservedPlanets, setPlanets])
    
    return (
      <div>         
        <main>
            <h1>Search for your favorite planets</h1>
            <form>
                <label htmlFor=""></label>
                <input defaultValue="" {...register('planetQuery')}></input>
                {isLoading || (planetInput !== planetQuery && planetInput !== '') && (
                <span>thinking</span>
                )}
            </form>
            {preservedPlanets.length > 0 && (
                <div>
                    <h3>{"Your saved planets"}</h3>
                    <Planets list={'preserved'} />
                </div>
            )}
            {planets.length > 0 && planetQuery !== '' ? (
                <div>
                <h3>{"Search results"}</h3>
                <h3>{"Click on a planet's name to save it to your favorites"}</h3>
                <Planets list={'results'}/>
                </div>
            ) : null}
            {isError && (
                <span>Error</span>
            )}
        </main>
      </div>
    )
  }