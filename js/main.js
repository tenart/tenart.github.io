// GLOBAL VARIABLES
// PROJECTS
const URL_PROJECTS_JSON = "/js/projects.json";
const URL_PROJECT_THUMBNAILS = "/img/project-thumbnails";
const ID_GENERAL_CONTAINER = "#general-projects";
const ID_MOBILE_CONTAINER = "#mobile-projects";
const ID_EXPERIMENTAL_CONTAINER = "#experimental-projects";
const ID_OTHER_CONTAINER = "#other-projects";
// EXPERIENCE
const URL_EXPERIENCES_JSON = "/js/experiences.json";
const ID_WORK_CONTAINER = "#work-experiences";
const ID_INTERNSHIP_CONTAINER = "#internship-experiences";
const ID_VOLUNTEER_CONTAINER = "#volunteer-experiences";

// Read projects.json from URL, start appending on callback
const getProjects = (url) => {
    $.getJSON(url, (json) => {
        appendProjects(json);
    })
}

// Read experiences.json from URL, start appending on callback
const getExperiences = (url) => {
    $.getJSON(url, (json) => {
        appendExperiences(json);
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

// Appends experience entries to page
const appendExperiences = (json) => {
    // Extract project categories
    const workExperiences = json.work;
    const internshipExperiences = json.internships;
    const volunteerExperiences = json.volunteering;
    // Append projects by category
    workExperiences.forEach((experience) => {
        $(ID_WORK_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    internshipExperiences.forEach((experience) => {
        $(ID_INTERNSHIP_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    volunteerExperiences.forEach((experience) => {
        $(ID_VOLUNTEER_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    
}

// Generate HTML for project tile from JSON data
const createProjectTileHTML = (project) => {
    const name = project.name;
    const id = project.p_id;
    const year = project.year;
    // Create and return HTML
    const $tileHTML = $(`
        <div class="project-tile" id="${id}">
            <img alt="${name}" src="${URL_PROJECT_THUMBNAILS}/${id}.jpg"/>
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

// Generate HTML for experience entry from JSON data
const createExperienceEntryHTML = (experience) => {
    const title = experience.title;
    const employer = experience.employer;
    const year_from = experience.from;
    const year_to = experience.to;
    const location = experience.location;
    const description = experience.description;
    const url = experience.url;

    const $entryHTML = $(`
        <div class="experience-entry flex-row">
            <div>
                <div class="experience-dash"></div>
            </div>
            <div class="experience-content">
                <h3>
                    ${title}
                </h3>
                <div class="experience-info">
                    <div class="flex-row info-row">
                        <img src="/img/ri-briefcase.svg"/>
                        <p>
                            <a href="${url}" target="_blank">
                                ${employer}
                            </a>
                        </p>
                    </div>
                    <div class="flex-row info-row">
                        <img src="/img/ri-calendar.svg"/>
                        <div class="flex-row year-row">
                            ${year_from === year_to ? `
                                <p>${year_from}</p>
                            ` : `
                                <p>${year_from}</p>
                                <img src="/img/ri-arrow-right.svg"/>
                                <p>${year_to}</p>
                            `}
                            
                        </div>
                    </div>
                    <div class="flex-row info-row">
                        <img src="/img/ri-location.svg"/>
                        <p>${location}</p>
                    </div>
                    <div class="flex-row info-row">
                        <img src="/img/ri-info.svg"/>
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
    return $entryHTML;
}

// ON PAGE READY
$(function() {
    // Read projects from JSON and render tiles
    getProjects(URL_PROJECTS_JSON);
    // Read experiences from JSON and render entries
    getExperiences(URL_EXPERIENCES_JSON);

});