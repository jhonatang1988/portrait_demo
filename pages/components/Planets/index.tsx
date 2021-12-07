export interface PlanetType {
    name: string;
    url: string;
  }
import { PlanetContext } from '../../index';

export const Planets = ( { list } : {list: string}) => {
    return (
        <PlanetContext.Consumer>
            {context => {
                const planetsToRender = list === 'results' ? context.planets : context.preservedPlanets;
                return (
                    <div>
                    {planetsToRender.map(planet => {
                      return (
                        <section key={planet.url}>
                          <div>
                            <button onClick={list === 'results' ? () => context.setPreservedPlanets(prev => [...prev, planet]) : () => {} }><h2>{planet.name}</h2></button>
                            {list === 'preserved' ? <button onClick={() => context.setPreservedPlanets(prev => prev.filter(pplanet => pplanet.url !== planet.url) )}><span>X</span></button> : null}
                            <a href={planet.url} target={'_blank'} rel="noreferrer">{planet.url}</a>
                          </div>
                      </section> 
                      )  
                    })}
                  </div>
                )   
            }}
        </PlanetContext.Consumer>
    )
}