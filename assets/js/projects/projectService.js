export const projectService = {
    getProjects: () => {
        return fetch ('../../../../database/projects.json', {
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
            return data.projects;
        })
        .catch((error) => {
            console.error("Error en la petición: ", error);
            throw error;
        });
    }
}