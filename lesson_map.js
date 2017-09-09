/**
 * scrapes the lesson list from  https://www.freecodecamp.org/map into
 * a 3d array and copies a json string of the result, e.g.
 * 
 * 
 *  [
 *      [
 *          "section1", ["asg1", "asg2", ...],
 *          "section2", ["asg1", "asg2", ...],
            ...
 *      ]
 *  ]
*/

const certification = document.querySelector('#collapseFront-End-Development-Certification>#nested')

const sections = Array.from(certification.querySelectorAll('h3>a'))

const  sectionData = sections.map(el => [el.innerText, Array.from(certification.querySelectorAll(`${el.href.slice(el.href.indexOf('#'))}>p>a`)).map(x => x.innerText.replace(/ (in)?complete$/gi, ''))]);

copy(JSON.stringify(sectionData))

