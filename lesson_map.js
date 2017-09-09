// parse from map

// https://www.freecodecamp.org/map


 certification = document.querySelector('#collapseFront-End-Development-Certification>#nested')

 sections = Array.from(certification.querySelectorAll('h3>a'))

  sectionData = sections.map(el => [el.innerText, Array.from(certification.querySelectorAll(`${el.href.slice(el.href.indexOf('#'))}>p>a`)).map(x => x.innerText.replace(/ (in)?complete$/gi, ''))]);

copy(JSON.stringify(sectionData))

