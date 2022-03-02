// GLOBAL VARIABLES
// STICKY HEADER IDs
const ID_MAIN_HEADER = "#main-header";
const ID_HEADER_TOP = "#header-top";
const ID_MAIN_CONTENT = "#main-content";
// PROJECTS URLs & IDs
const URL_PROJECTS_JSON = "/js/projects.json";
const URL_PROJECT_THUMBNAILS = "/img/project-thumbnails";
const ID_GENERAL_CONTAINER = "#general-projects";
const ID_MOBILE_CONTAINER = "#mobile-projects";
const ID_EXPERIMENTAL_CONTAINER = "#experimental-projects";
const ID_OTHER_CONTAINER = "#other-projects";
// EXPERIENCE URLs & IDs
const URL_EXPERIENCES_JSON = "/js/experiences.json";
const ID_WORK_CONTAINER = "#work-experiences";
const ID_WORK_NOTICE = "#work-notice";
const ID_INTERNSHIP_CONTAINER = "#internship-experiences";
const ID_INTERNSHIP_NOTICE = "#internship-notice";
const ID_VOLUNTEER_CONTAINER = "#volunteer-experiences";
const ID_VOLUNTEER_NOTICE = "#volunteer-notice";
const CLASS_SUB_SECTION_TOGGLE = ".sub-section-toggle";
const CLASS_HIDDEN_NOTICE = ".hidden-notice";
const CLASS_SUB_SECTION_ARROW = ".sub-section-arrow";

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
    // Extract experience entries categories
    const workExperiences = json.work;
    const internshipExperiences = json.internships;
    const volunteerExperiences = json.volunteering;
    // Append experience entries by category
    workExperiences.forEach((experience) => {
        $(ID_WORK_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    internshipExperiences.forEach((experience) => {
        $(ID_INTERNSHIP_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    volunteerExperiences.forEach((experience) => {
        $(ID_VOLUNTEER_CONTAINER).append(createExperienceEntryHTML(experience));
    });
    // Update entry count in hidden notices;
    $(ID_WORK_NOTICE).text(`${workExperiences.length} ${workExperiences.length === 1 ? "item" : "items"} hidden`);
    $(ID_INTERNSHIP_NOTICE).text(`${internshipExperiences.length} ${internshipExperiences.length === 1 ? "item" : "items"} hidden`);
    $(ID_VOLUNTEER_NOTICE).text(`${volunteerExperiences.length} ${volunteerExperiences.length === 1 ? "item" : "items"} hidden`);
    
}

// Generate HTML for project tile from JSON data
const createProjectTileHTML = (project) => {
    const name = project.name;
    const id = project.p_id;
    const year = project.year;
    // Create and return HTML
    const $tileHTML = $(`
        <button class="project-tile" id="${id}">
            <img alt="${name}" src="${URL_PROJECT_THUMBNAILS}/${id}.jpg"/>
            <div class="flex-col">
                <p class="proj-name flex-grow flex-col">
                    ${name}
                </p>
                <p class="proj-year">
                    ${year}
                </p>
            </div>
        </button>
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
    // Create and return HTML
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

// Stick header to top if window scrolled by a certain distance
const stickHeader = () => {   
    // Get scroll distance and header top height
    const scrollDistance = window.scrollY;
    const headerTopHeight = $(ID_HEADER_TOP).height();
    // If scrolling past header top then stick nav bar
    if(scrollDistance < headerTopHeight) {
        $(ID_MAIN_HEADER).css("margin-top", 0);
    } else {
        $(ID_MAIN_HEADER).css("margin-top", -1 * headerTopHeight);
    } 
}

// subsection toggle handler
const toggleSubSection = (event) => {
    const $parentWrapper = $(event.target).closest(CLASS_SUB_SECTION_TOGGLE);
    const $hiddenNotice = $parentWrapper.find(CLASS_HIDDEN_NOTICE);
    const $subSectionArrow = $parentWrapper.find(CLASS_SUB_SECTION_ARROW);
    const toggleTarget = $parentWrapper.attr("data-target");
    const targetID = `#${toggleTarget}-experiences`;
    $(targetID).slideToggle(200);
    $hiddenNotice.toggle();
    $subSectionArrow.toggleClass("arrow-up");
}

// ON PAGE READY
$(function() {
    // INIT
    // Read projects and work experiences from JSON and render HTML
    getProjects(URL_PROJECTS_JSON);
    getExperiences(URL_EXPERIENCES_JSON);
    
    // LISTENERS
    // Set sticky header behavior on scroll & window resize
    $(window).on("scroll", stickHeader);
    $(window).on("resize", stickHeader);
    // Toggle subsection on click
    $(CLASS_SUB_SECTION_TOGGLE).on("click", (event) => { toggleSubSection(event) });
});