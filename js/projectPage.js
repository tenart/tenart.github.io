// PROJECTS URLs & IDs
const URL_PROJECTS_JSON = "/js/projects.json";
const URL_PROJECT_THUMBNAILS = "/img/project-thumbnails";
const QUERY_KEY = "?name=";
// PAGE IDs
const PROJECT_NAME = "#project-name";
const PROJECT_THUMB = "#project-thumb";
const PROJECT_YEAR = "#project-year";
const PROJECT_DESCRIPTION = "#project-description";
const PROJECT_MAIN_URL = "#project-main-url";
const PROJECT_NO_LINK = "#no-link-message";
const PROJECT_TECH_CONTAINER = "#tech-container";
const PROJECT_TAGS_CONTAINER = "#tags-container";

// Redirect to homepage
const goToHome = () => {
    window.location.href = "/";
}

// Search through URL and return the proper project ID
const getProjectName = (url) => {
    // Look for position of query keyword
    const queryPosition = url.indexOf(QUERY_KEY);
    if(queryPosition === -1) {
        // If URL not properly formatted
        goToHome();
    } else {
        // If keyword is found extract project ID
        const projectID = url.substring(queryPosition + QUERY_KEY.length);
        return projectID;
    }
}

// Read projects JSON and start parsing process
const loadProject = (url, projectID) => {
    $.getJSON(url, (json) => {
        parseJSON(json, projectID);
    })
}

// Starts JSON parse
const parseJSON = (json, projectID) => {
    // Break projects into category
    const generalProjects = json.general_web_dev;
    const mobileProjects = json.mobile_web_dev;
    const experimentalProjects = json.experimental_dev;
    const otherProjects = json.other;
    // Look by category
    const generalResult = findProject(generalProjects, projectID);
    const mobileResult = findProject(mobileProjects, projectID);
    const experimentalResult = findProject(experimentalProjects, projectID);
    const otherResult = findProject(otherProjects, projectID);
    // If found
    if(generalResult !== undefined) {
        renderPage(generalResult);
    } else if(mobileResult !== undefined) {
        renderPage(mobileResult);
    } else if(experimentalResult !== undefined) {
        renderPage(experimentalResult);
    } else if(otherResult !== undefined) {
        renderPage(otherResult);
    } else {
        // If not found
        console.log("NOT FOUND");
    }
}

// Read through an array of projects to find the desired ID
const findProject = (category, projectID) => {
    let result = undefined;
    // If found
    category.forEach((project) => {
        if(project.p_id === projectID) {
            result = project;
        }
    })
    // If not found, return undefined
    return result;
}

// Render project page
const renderPage = (project) => {
    const name = project.name;
    const id = project.p_id;
    const year = project.year;
    const description = project.desc;
    const tech = project.tech;
    const tags = project.tags;
    const url = project.url;
    const thumbnailURL = `${URL_PROJECT_THUMBNAILS}/${id}.jpg`;
    console.log(project);
    // Change page title
    document.title = `Tom's Portfolio - ${name}`;
    // Update project info
    $(PROJECT_THUMB).attr("src", thumbnailURL);
    $(PROJECT_NAME).text(name);
    $(PROJECT_YEAR).text(year);
    $(PROJECT_DESCRIPTION).text(description);
    // Empty and append tags
    $(PROJECT_TECH_CONTAINER).empty();
    $(PROJECT_TAGS_CONTAINER).empty();
    tech.forEach((tag) => {
        $(PROJECT_TECH_CONTAINER).append(makeTag(tag, "tech"));
    });
    tags.forEach((tag) => {
        $(PROJECT_TAGS_CONTAINER).append(makeTag(tag, "tag"));
    })
    // Check if has online URL
    if(url === undefined) {
        $(PROJECT_MAIN_URL).remove();
    } else {
        $(PROJECT_NO_LINK).remove();
        $(PROJECT_MAIN_URL).attr("href", url);
    }
}

const makeTag = (tag, type) => {
    const html = `
        <div class="tag ${type}-tag">${tag}</div>
    `;
    return html;
}


$(function() {
    const projectID = getProjectName(window.location.href);
    loadProject(URL_PROJECTS_JSON, projectID);
})