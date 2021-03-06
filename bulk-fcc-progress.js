// ==UserScript==
// @name         FCC Progress
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       David Cohen
// @updateURL    https://raw.githubusercontent.com/dacohenii/fcc-progress/master/bulk-fcc-progress.js
// @match        https://docs.google.com/spreadsheets/*
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect      freecodecamp.org
// @connect      freecodecamp.com
// ==/UserScript==


(function() {
    function sanitizeText(text) {
        return text.split('').map(char => char.toLowerCase()).filter(char => /[a-z]/.test(char)).join('');
    }

    Set.prototype.intersection = function(setB) {
        var intersection = new Set();
        for (var elem of setB) {
            if (this.has(elem)) {
                intersection.add(elem);
            }
        }
        return intersection;
    }

    const sections = [
        [
            "HTML5 and CSS",
            [
                "Learn How freeCodeCamp Works",
                "Say Hello to HTML Elements",
                "Headline with the h2 Element",
                "Inform with the Paragraph Element",
                "Uncomment HTML",
                "Comment out HTML",
                "Fill in the Blank with Placeholder Text",
                "Delete HTML Elements",
                "Change the Color of Text",
                "Join a freeCodeCamp Study Group in Your City",
                "Become a Supporter",
                "Use CSS Selectors to Style Elements",
                "Use a CSS Class to Style an Element",
                "Style Multiple Elements with a CSS Class",
                "Change the Font Size of an Element",
                "Set the Font Family of an Element",
                "Import a Google Font",
                "Specify How Fonts Should Degrade",
                "Add Images to your Website",
                "Size your Images",
                "Add Borders Around your Elements",
                "Add Rounded Corners with a Border Radius",
                "Make Circular Images with a Border Radius",
                "Link to External Pages with Anchor Elements",
                "Nest an Anchor Element within a Paragraph",
                "Make Dead Links using the Hash Symbol",
                "Turn an Image into a Link",
                "Create a Bulleted Unordered List",
                "Create an Ordered List",
                "Create a Text Field",
                "Add Placeholder Text to a Text Field",
                "Create a Form Element",
                "Add a Submit Button to a Form",
                "Use HTML5 to Require a Field",
                "Create a Set of Radio Buttons",
                "Create a Set of Checkboxes",
                "Check Radio Buttons and Checkboxes by Default",
                "Nest Many Elements within a Single Div Element",
                "Give a Background Color to a Div Element",
                "Set the ID of an Element",
                "Use an ID Attribute to Style an Element",
                "Adjusting the Padding of an Element",
                "Adjust the Margin of an Element",
                "Add a Negative Margin to an Element",
                "Add Different Padding to Each Side of an Element",
                "Add Different Margins to Each Side of an Element",
                "Use Clockwise Notation to Specify the Padding of an Element",
                "Use Clockwise Notation to Specify the Margin of an Element",
                "Style the HTML Body Element",
                "Inherit Styles from the Body Element",
                "Prioritize One Style Over Another",
                "Override Styles in Subsequent CSS",
                "Override Class Declarations by Styling ID Attributes",
                "Override Class Declarations with Inline Styles",
                "Override All Other Styles by using Important",
                "Use Hex Code for Specific Colors",
                "Use Hex Code to Mix Colors",
                "Use Abbreviated Hex Code",
                "Use RGB values to Color Elements",
                "Use RGB to Mix Colors"
            ]
        ],
        [
            "Responsive Design with Bootstrap",
            [
                "Use Responsive Design with Bootstrap Fluid Containers",
                "Make Images Mobile Responsive",
                "Center Text with Bootstrap",
                "Create a Bootstrap Button",
                "Create a Block Element Bootstrap Button",
                "Taste the Bootstrap Button Color Rainbow",
                "Call out Optional Actions with Button Info",
                "Warn your Users of a Dangerous Action",
                "Use the Bootstrap Grid to Put Elements Side By Side",
                "Ditch Custom CSS for Bootstrap",
                "Use Spans for Inline Elements",
                "Create a Custom Heading",
                "Add Font Awesome Icons to our Buttons",
                "Add Font Awesome Icons to all of our Buttons",
                "Responsively Style Radio Buttons",
                "Responsively Style Checkboxes",
                "Style Text Inputs as Form Controls",
                "Line up Form Elements Responsively with Bootstrap",
                "Create a Bootstrap Headline",
                "House our page within a Bootstrap Container Fluid Div",
                "Create a Bootstrap Row",
                "Split your Bootstrap Row",
                "Create Bootstrap Wells",
                "Add Elements within your Bootstrap Wells",
                "Apply the Default Bootstrap Button Style",
                "Create a Class to Target with jQuery Selectors",
                "Add ID Attributes to Bootstrap Elements",
                "Label Bootstrap Wells",
                "Give Each Element a Unique ID",
                "Label Bootstrap Buttons",
                "Use Comments to Clarify Code"
            ]
        ],
        [
            "jQuery",
            [
                "Learn how Script Tags and Document Ready Work",
                "Target HTML Elements with Selectors Using jQuery",
                "Target Elements by Class Using jQuery",
                "Target Elements by ID Using jQuery",
                "Delete your jQuery Functions",
                "Target the same element with multiple jQuery Selectors",
                "Remove Classes from an element with jQuery",
                "Change the CSS of an Element Using jQuery",
                "Disable an Element Using jQuery",
                "Change Text Inside an Element Using jQuery",
                "Remove an Element Using jQuery",
                "Use appendTo to Move Elements with jQuery",
                "Clone an Element Using jQuery",
                "Target the Parent of an Element Using jQuery",
                "Target the Children of an Element Using jQuery",
                "Target a Specific Child of an Element Using jQuery",
                "Target Even Numbered Elements Using jQuery",
                "Use jQuery to Modify the Entire Page"
            ]
        ],
        [
            "Basic Front End Development Projects",
            [
                "Get Set for our Front End Development Projects",
                "Build a Tribute Page",
                "Build a Personal Portfolio Webpage"
            ]
        ],
        [
            "Basic JavaScript",
            [
                "Comment your JavaScript Code",
                "Declare JavaScript Variables",
                "Storing Values with the Assignment Operator",
                "Initializing Variables with the Assignment Operator",
                "Understanding Uninitialized Variables",
                "Understanding Case Sensitivity in Variables",
                "Add Two Numbers with JavaScript",
                "Subtract One Number from Another with JavaScript",
                "Multiply Two Numbers with JavaScript",
                "Divide One Number by Another with JavaScript",
                "Increment a Number with JavaScript",
                "Decrement a Number with JavaScript",
                "Create Decimal Numbers with JavaScript",
                "Multiply Two Decimals with JavaScript",
                "Divide one Decimal by Another with JavaScript",
                "Finding a Remainder in JavaScript",
                "Compound Assignment With Augmented Addition",
                "Compound Assignment With Augmented Subtraction",
                "Compound Assignment With Augmented Multiplication",
                "Compound Assignment With Augmented Division",
                "Convert Celsius to Fahrenheit",
                "Declare String Variables",
                "Escaping Literal Quotes in Strings",
                "Quoting Strings with Single Quotes",
                "Escape Sequences in Strings",
                "Concatenating Strings with Plus Operator",
                "Concatenating Strings with the Plus Equals Operator",
                "Constructing Strings with Variables",
                "Appending Variables to Strings",
                "Find the Length of a String",
                "Use Bracket Notation to Find the First Character in a String",
                "Understand String Immutability",
                "Use Bracket Notation to Find the Nth Character in a String",
                "Use Bracket Notation to Find the Last Character in a String",
                "Use Bracket Notation to Find the Nth-to-Last Character in a String",
                "Word Blanks",
                "Store Multiple Values in one Variable using JavaScript Arrays",
                "Nest one Array within Another Array",
                "Access Array Data with Indexes",
                "Modify Array Data With Indexes",
                "Access Multi-Dimensional Arrays With Indexes",
                "Manipulate Arrays With push()",
                "Manipulate Arrays With pop()",
                "Manipulate Arrays With shift()",
                "Manipulate Arrays With unshift()",
                "Shopping List",
                "Write Reusable JavaScript with Functions",
                "Passing Values to Functions with Arguments",
                "Global Scope and Functions",
                "Local Scope and Functions",
                "Global vs. Local Scope in Functions",
                "Return a Value from a Function with Return",
                "Assignment with a Returned Value",
                "Stand in Line",
                "Understanding Boolean Values",
                "Use Conditional Logic with If Statements",
                "Comparison with the Equality Operator",
                "Comparison with the Strict Equality Operator",
                "Comparison with the Inequality Operator",
                "Comparison with the Strict Inequality Operator",
                "Comparison with the Greater Than Operator",
                "Comparison with the Greater Than Or Equal To Operator",
                "Comparison with the Less Than Operator",
                "Comparison with the Less Than Or Equal To Operator",
                "Comparisons with the Logical And Operator",
                "Comparisons with the Logical Or Operator",
                "Introducing Else Statements",
                "Introducing Else If Statements",
                "Logical Order in If Else Statements",
                "Chaining If Else Statements",
                "Golf Code",
                "Selecting from many options with Switch Statements",
                "Adding a default option in Switch statements",
                "Multiple Identical Options in Switch Statements",
                "Replacing If Else Chains with Switch",
                "Returning Boolean Values from Functions",
                "Return Early Pattern for Functions",
                "Counting Cards",
                "Build JavaScript Objects",
                "Accessing Objects Properties with the Dot Operator",
                "Accessing Objects Properties with Bracket Notation",
                "Accessing Objects Properties with Variables",
                "Updating Object Properties",
                "Add New Properties to a JavaScript Object",
                "Delete Properties from a JavaScript Object",
                "Using Objects for Lookups",
                "Testing Objects for Properties",
                "Manipulating Complex Objects",
                "Accessing Nested Objects",
                "Accessing Nested Arrays",
                "Iterate with JavaScript For Loops",
                "Iterate Odd Numbers With a For Loop",
                "Count Backwards With a For Loop",
                "Iterate Through an Array with a For Loop",
                "Nesting For Loops",
                "Iterate with JavaScript While Loops",
                "Profile Lookup",
                "Generate Random Fractions with JavaScript",
                "Generate Random Whole Numbers with JavaScript",
                "Generate Random Whole Numbers within a Range",
                "Sift through Text with Regular Expressions",
                "Find Numbers with Regular Expressions",
                "Find Whitespace with Regular Expressions",
                "Invert Regular Expression Matches with JavaScript"
            ]
        ],
        [
            "Object Oriented and Functional Programming",
            [
                "Declare JavaScript Objects as Variables",
                "Construct JavaScript Objects with Functions",
                "Make Instances of Objects with a Constructor Function",
                "Make Unique Objects by Passing Parameters to our Constructor",
                "Make Object Properties Private",
                "Iterate over Arrays with map",
                "Condense arrays with reduce",
                "Filter Arrays with filter",
                "Sort Arrays with sort",
                "Reverse Arrays with reverse",
                "Concatenate Arrays with concat",
                "Split Strings with split",
                "Join Strings with join"
            ]
        ],
        [
            "Basic Algorithm Scripting",
            [
                "Get Set for our Algorithm Challenges",
                "Reverse a String",
                "Factorialize a Number",
                "Check for Palindromes",
                "Find the Longest Word in a String",
                "Title Case a Sentence",
                "Return Largest Numbers in Arrays",
                "Confirm the Ending",
                "Repeat a string repeat a string",
                "Truncate a string",
                "Chunky Monkey",
                "Slasher Flick",
                "Mutations",
                "Falsy Bouncer",
                "Seek and Destroy",
                "Where do I belong",
                "Caesars Cipher"
            ]
        ],
        [
            "JSON APIs and Ajax",
            [
                "Trigger Click Events with jQuery",
                "Change Text with Click Events",
                "Get JSON with the jQuery getJSON Method",
                "Convert JSON Data to HTML",
                "Render Images from Data Sources",
                "Prefilter JSON",
                "Get Geo-location Data"
            ]
        ],
        [
            "Intermediate Front End Development Projects",
            [
                "Build a Random Quote Machine",
                "Show the Local Weather",
                "Build a Wikipedia Viewer",
                "Use the Twitch.tv JSON API"
            ]
        ],
        [
            "Intermediate Algorithm Scripting",
            [
                "Sum All Numbers in a Range",
                "Diff Two Arrays",
                "Roman Numeral Converter",
                "Wherefore art thou",
                "Search and Replace",
                "Pig Latin",
                "DNA Pairing",
                "Missing letters",
                "Boo who",
                "Sorted Union",
                "Convert HTML Entities",
                "Spinal Tap Case",
                "Sum All Odd Fibonacci Numbers",
                "Sum All Primes",
                "Smallest Common Multiple",
                "Finders Keepers",
                "Drop it",
                "Steamroller",
                "Binary Agents",
                "Everything Be True",
                "Arguments Optional"
            ]
        ],
        [
            "Advanced Algorithm Scripting",
            [
                "Validate US Telephone Numbers",
                "Record Collection",
                "Symmetric Difference",
                "Exact Change",
                "Inventory Update",
                "No repeats please",
                "Make a Person",
                "Map the Debris",
                "Pairwise"
            ]
        ],
        [
            "Advanced Front End Development Projects",
            [
                "Build a JavaScript Calculator",
                "Build a Pomodoro Clock",
                "Build a Tic Tac Toe Game",
                "Build a Simon Game"
            ]
        ]
    ];

    /**
     * take a string and turn it into a DOM node
     */
    function parseDOM(str){
        const parser = new DOMParser();
        return parser.parseFromString(str, "text/html");
    }

    /**
     * takes a parent DOM node (e.g. document)
     * and scrapes the HTML to determine completion of all sections.
     *
     * returns an array of respective completion percentages for each section
     */
    function getStudentProgress(node = document){

        // total complete over all sections
        const arrComplete = Array.from(node.querySelectorAll('body div table > tbody > tr > td:nth-child(1)')).map(x => sanitizeText(x.innerText));
        const setComplete = new Set(arrComplete);

        return sections.map(section => {
            const assignments = section[1].map(sanitizeText);
            // this is the important part...
            const sectionProgress = setComplete.intersection(assignments).size;

            // expressed as a percentage:
            return `${Math.round(100 * sectionProgress / assignments.length)}%`;
        });
    }

    function init(){
        const strUrls = prompt('Paste all URLs here and click OK');
        if(!strUrls){ return false; }

        const urls = strUrls.split(/[ \n]+/);

        // create a result container array
        const result = urls.map(url => "");

        const responsesExpected = urls.filter(u => u.length > 0).length;

        let responsesReceived = 0;

        // asynchronously fill the container
        urls.forEach(function(u, i){
            // skip blank lines
            if(u.length){ 
                GM_xmlhttpRequest({
                  "method": "GET",
                  "url": u,
                  "onerror": function(response){
                    responsesReceived++;
                    result[i] = 'Error - check the console.';
                    console.error(`Bad response from ${url}:`, response);
                  },
                  "onload": function(response) {
                    responsesReceived++;
                    result[i] = getStudentProgress(parseDOM(response.responseText)).join('\t');

                    // this is how we find out whether we're done.
                    if(responsesReceived >= responsesExpected){
                        GM_setClipboard(result.join('\n'), { type: 'text', mimetype: 'text/plain'});

                        GM_notification({
                            title: "Results Copied.",
                            text: "Select the top-left destination cell and paste."
                        });
                    }
                  }
                });
            }
        });

    }

    GM_registerMenuCommand("Get Student Progress", init);

})();
