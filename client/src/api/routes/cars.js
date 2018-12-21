import api from '../api';

export const addCar = (car) => {
    return new Promise((resolve, reject) => {
        try {
            api.post('cars', car).then((response) => {
                resolve(response.data);

            }).catch((error) => {
                console.log(error);
                reject(error);
            });

        } catch (error) {
            reject(error);
        }
    });
};