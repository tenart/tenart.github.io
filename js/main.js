// GLOBAL VARIABLES
const URL_PROJECTS_JSON = "/js/projects.json";
const URL_PROJECT_THUMBNAILS = "/img/project-thumbnails";
const ID_GENERAL_CONTAINER = "#general-projects";
const ID_MOBILE_CONTAINER = "#mobile-projects";
const ID_EXPERIMENTAL_CONTAINER = "#experimental-projects";
const ID_OTHER_CONTAINER = "#other-projects";

// Read projects.json from URL, start appending on callback
const getProjects = (url) => {
    $.getJSON(url, (json) => {
        appendProjects(json);
    })
}

// Appends project tiles to page
const appendProjects = (json) => {
    // Extract project categories
    const generalProjects = json.general_web_dev;
    const mobileProjects = json.mobile_web_dev;
    const experimentalProjects = json.experimental_dev;
    const otherProjects = json.other;
    // Append projects by category
    generalProjects.forEach((project) => {
        $(ID_GENERAL_CONTAINER).append(createProjectTileHTML(project));
    });
    mobileProjects.forEach((project) => {
        $(ID_MOBILE_CONTAINER).append(createProjectTileHTML(project));
    });
    experimentalProjects.forEach((project) => {
        $(ID_EXPERIMENTAL_CONTAINER).append(createProjectTileHTML(project));
    });
    otherProjects.forEach((project) => {
        $(ID_OTHER_CONTAINER).append(createProjectTileHTML(project));
    });
    
}

// Generate HTML for project tile from JSON data
const createProjectTileHTML = (project) => {
    const name = project.name;
    const id = project.p_id;
    const year = project.year;
    // Create and return HTML
    const $tileHTML = $(`
        <div class="project-tile">
            <img alt="${name}" src="${URL_PROJECT_THUMBNAILS}/${id}.jpg">
            <div class="flex-col">
                <p class="proj-name flex-grow flex-col">
                    ${name}
                </p>
                <p class="proj-year">
                    ${year}
                </p>
            </div>
        </div>
    `);
    return $tileHTML;
}

// ON PAGE READY
$(function() {
    // Read projects from JSON and render tiles
    getProjects(URL_PROJECTS_JSON);

});