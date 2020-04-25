
/* get all the sections in the html file. */
function get_all_sections(){
  let sections = document.querySelectorAll('main section');
  return sections;
}

/* get the navigation bar list that section 
 *items should be added to as list item */
function find_navbar__list(){
  let navbar__list = document.querySelector('#navbar__list');
  return navbar__list;
}

/**
 * generate html text to be added to navigation list based on the given section element.
 * @param {*} section 
 */
function create_navigation_list_html(section){
  const text = section.querySelector('h2').textContent;
  const nav_html = `<li><a href="#${section.id}">${text}</a></li>`;
  return nav_html;
}

/**
 * add sections to nav navigation_bar
 * @param {*} sections 
 * @param {*} navigation_bar 
 */
function add_sections_to_navbar__list(sections, navigation_bar){
  let html_to_add = ''
  for (const section of sections){
    html_to_add = html_to_add +  create_navigation_list_html(section);
    html_to_add = html_to_add + '\n';
  }
  navigation_bar.insertAdjacentHTML('afterbegin', html_to_add);
}

/**
 * Calculates the distance between top edge of element to the top of the viewport
 * @param {*} elem 
 */
function distance_to_top(elem) {
  return elem.getBoundingClientRect().top;
};

/**
 * returns the closest section to the top of viewport
 */
function get_closest_section_to_top(){
  let min_dist = document.body.clientHeight;
  let closest_to_top_section;
  for (const section of sections){
    current_distance = Math.abs(distance_to_top(section));
    if (current_distance < min_dist){
      closest_to_top_section = section;
      min_dist = current_distance;
    }
  }
  return closest_to_top_section
}

/**
 * Sets the given section (active_section) to be active, and deactivates the rest.
 * @param {*} active_section 
 */
function set_active_section(active_section){
  for (let section of sections){
    if (section == active_section){
      section.classList.add("active-section");
    } 
    else {
      section.classList.remove("active-section");
    }
  }
}

/* Main */
let sections  = get_all_sections();
let navbar__list = find_navbar__list();
add_sections_to_navbar__list(sections, navbar__list);

/* scroll listener to set the active section */
document.addEventListener('scroll', function(){
  active_section = get_closest_section_to_top();
  set_active_section(active_section);
})