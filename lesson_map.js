// parse from map

// https://www.freecodecamp.org/map


 certification = document.querySelector('#collapseFront-End-Development-Certification>#nested')

 sections = Array.from(certification.querySelectorAll('h3>a'))

 sectionData = sections.map(el => [el.innerText, Array.from(certification.querySelectorAll(`${el.href.slice(el.href.indexOf('#'))}>p>a>span:nth-child(1)`)).map(x => x.innerText)]);

copy(JSON.stringify(sectionData))

