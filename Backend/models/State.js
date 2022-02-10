class State {
    #name;
    #population;
    #totalCases;
    #hospitalizations;
    #deaths;

    constructor(name, population, totalCases, hospitalizations, deaths) {
        this.#name = name;
        this.#population = population;
        this.#totalCases = totalCases;
        this.#hospitalizations = hospitalizations;
        this.#deaths = deaths;
    }
}
