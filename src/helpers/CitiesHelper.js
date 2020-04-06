import cities from './cities.json';

export default class CitiesHelper {
    static getCountiesWithCities() {
        return cities.reduce((accumulator, city) => {
            const { judet, nume } = city;
            if(!accumulator[judet]) {
                accumulator[judet] = [];
            }
            accumulator[judet].push({ value: nume, label: nume });
            return accumulator;
        }, {});
    }
}
