/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
/**
 * @global {studentList} - List of student list items
 * @global {perpage} - Number of items per view
 */
const studentList = document.querySelectorAll(".student-item");
const perPage = 10;

/**
 * @function {showPage} - Loops through all list items and appends on DOM(DOCUMENT OBJECT MODEL) - Unordered list (@var - {ul}) - base on (@param - {page}) and on conditional statement.
 * @param {list} - Array variable of list items.
 * @param {page} - Number variable of current page.
 * @var {ul} - Store unordered list object.
 * @global {perPage} - Global scope variable - number of list items per page.
 * @constant {startIndex} - Store starting index of list items array - base on calculation(@param - {page} times @global - {perPage} substract @global - {perPage}).
 * @constant {endIndex} - Store end index of list items array - base on calculation(@param - {page} substract @global - {perPage}).
 *
 */
const showPage = (list, page) => {
  const startIndex = page * perPage - perPage;
  const endIndex = page * perPage;

  let ul = document.querySelector(".student-list");
  ul.innerHTML = "";

  // loop through list array.
  for (let i = 0; i < list.length; i += 1) {
    // check if current index is greater or equal to start index and less than end index.
    if (i >= startIndex && i < endIndex) {
      ul.appendChild(list[i]);
    }
  }
};
/**
 * @function {showPage} - Calling function to initialize list pagination
 */
showPage(studentList, 1);

/**
 * @function {appendPageLinks} - To generate, append, and add functionality to the pagination buttons.
 * @param {list} - Array variable of list items.
 * @constant {pages} - Store number of pages in student app - base on Math - JavaScript build-in object @method Math.ceil(list length divide by number of elements per page)
 * @global {perPage} - Global scope variable - number of list items per page.
 * @constant {container} - Store DOM element base on class.
 * @function {createElement} - To create HTML element base on params.
 * @constant {div} - Store new created element - calling @function {createElement - with @param elem, @param prop, @param value}
 * @constant {ul} - Store new created element - calling @function {createElement}
 * @constant {li} - Store new created element for each pages - calling @function {createElement}
 * @constant {anhor} - Store new created element for each pages - calling @function {createElement - with @param elem, @param prop, @param value}
 * @constant {links} - Store all created anhor links.
 */
const appendPageLinks = (list) => {
  const pages = Math.ceil(list.length / perPage);
  const container = document.querySelector(".page");

  /**
   *
   * @param {elem} - DOM element which whant to make.
   * @param {prop} - Default value is set to undefined, to create any other element without passing prop to a function
   * @param {value} - Default value is set to undefined, to create any other element without passing value to a function
   * @returns created DOM element.
   *
   */
  function createElement(elem, prop = undefined, value = undefined) {
    const element = document.createElement(elem);
    element[prop] = value;
    return element;
  }
  // div for pagination
  const div = createElement("div", "className", "pagination");
  const ul = createElement("ul");
  div.appendChild(ul);

  // loop through pages and create, add HTML elements to pagination list
  for (let i = 1; i <= pages; i += 1) {
    const li = createElement("li");
    const anhor = createElement("a", "textContent", i);
    li.appendChild(anhor);
    ul.appendChild(li);
  }
  // append pagination to container
  container.appendChild(div);

  const links = document.querySelectorAll(".pagination ul li a");
  /**
   * @function {handleClick} - Listen on event, and calls @function {loopThroughLinks}, @function {setActiveLink}, @function {showPage} and store current page in @constant {page}
   * @param {link} - Variable of DOM element
   * @event {`click`} - Every link object listens on click event and then calls @function {loopThroughLinks} - with first class citizen @function {removeActiveLink}.
   * @function {loopThroughLinks} - Calling loopThroughLinks to loop through anhor array and pass @function {removeActiveLink} to do on every anhor in array.
   * @function {setActiveLink} - Call to set new active anhor.
   * @constant {page} - Store number of current page by event target.
   * @function {showPage} - Call to display student list by @constant {page}.
   *
   * */
  function handleClick(link) {
    link.addEventListener("click", (e) => {
      loopThroughLinks(removeActiveLink);
      setActiveLink(e.target);
      const page = parseInt(e.target.textContent);
      showPage(list, page);
    });
  }
  /**
   *
   * @param {link} - Variable of DOM element - removes DOM element property className
   *
   */
  function removeActiveLink(link) {
    link.className = "";
  }
  /**
   *
   * @param {link} - Variable of DOM element - sets DOM element property className to 'active'.
   */
  function setActiveLink(link) {
    link.className = "active";
  }
  /**
   *
   * @param {func} - Function which will run on every link item.
   * @function {setActiveLink} - Base on condition - sets first pagination link className to `active`.
   *
   */
  function loopThroughLinks(func) {
    for (let i = 0; i < links.length; i += 1) {
      if (i === 0) {
        setActiveLink(links[i]);
      }
      func(links[i]);
    }
  }
  // Initialize click event on every anhor link
  loopThroughLinks(handleClick);
};
// Append page links
appendPageLinks(studentList);