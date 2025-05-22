export const service = {
    getProjects: () => {
        return fetch ('https://mother-s-milk.github.io/Portfolio-FrancoD.Vera/database/projects.json', {
            method: "GET",
            headers: {}
        })
        .then (response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error en la petición: ", error);
            throw error;
        });
    }
}