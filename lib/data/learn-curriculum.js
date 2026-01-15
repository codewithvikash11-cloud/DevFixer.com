
import { Server, BrainCircuit, Database, Terminal, Code2, Globe, Cpu, Smartphone } from 'lucide-react';

export const CURRICULUM = [
    {
        id: 'html',
        title: 'HTML',
        icon: "/images/html.png", // Keep simplified paths if images exist, else fallback to lucide will be handled in UI
        color: 'text-orange-500',
        sections: [
            {
                title: 'Introduction',
                lessons: [
                    {
                        id: 'html-intro',
                        title: 'Introduction',
                        difficulty: 'Beginner',
                        time: '5 min',
                        content: `
                            <h2>Introduction to HTML</h2>
                            <p>HTML is the standard markup language for creating Web pages.</p>
                            <div class="note">HTML stands for Hyper Text Markup Language</div>
                            <p>HTML describes the structure of a Web page using markup. HTML elements are the building blocks of HTML pages. HTML elements are represented by tags.</p>
                            <h3>HTML Tags</h3>
                            <p>HTML tags are element names surrounded by angle brackets:</p>
                            <pre><code>&lt;tagname&gt;content goes here...&lt;/tagname&gt;</code></pre>
                            <ul>
                                <li>HTML tags normally come in pairs like <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code></li>
                                <li>The first tag in a pair is the start tag, the second tag is the end tag</li>
                                <li>The end tag is written like the start tag, but with a forward slash inserted before the tag name</li>
                            </ul>
                        `,
                        code: {
                            html: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`,
                            css: `body { font-family: sans-serif; padding: 20px; }`,
                            js: ``
                        }
                    },
                    {
                        id: 'html-editors',
                        title: 'Editors',
                        difficulty: 'Beginner',
                        time: '5 min',
                        content: `<h2>HTML Editors</h2><p>Learn how to use Notepad or TextEdit to write HTML.</p>`,
                        code: { html: `<!-- No code for this lesson -->`, css: ``, js: `` }
                    },
                    {
                        id: 'html-basic',
                        title: 'Basic Structure',
                        difficulty: 'Beginner',
                        time: '10 min',
                        content: `
                             <h2>HTML Basic Structure</h2>
                             <p>All HTML documents must start with a document type declaration: <code>&lt;!DOCTYPE html&gt;</code>.</p>
                             <p>The HTML document itself begins with <code>&lt;html&gt;</code> and ends with <code>&lt;/html&gt;</code>.</p>
                             <p>The visible part of the HTML document is between <code>&lt;body&gt;</code> and <code>&lt;/body&gt;</code>.</p>
                         `,
                        code: {
                            html: `<!DOCTYPE html>
 <html>
 <body>
 
 <h2>HTML Basic Structure</h2>
 <p>This is a paragraph.</p>
 <p>This is another paragraph.</p>
 
 </body>
 </html>`,
                            css: ``,
                            js: ``
                        }
                    }
                ]
            },
            {
                title: 'Elements & Attributes',
                lessons: [
                    {
                        id: 'html-elements',
                        title: 'Elements',
                        difficulty: 'Beginner',
                        time: '10 min',
                        content: `<h2>HTML Elements</h2><p>An HTML element is defined by a start tag, some content, and an end tag.</p>`,
                        code: { html: `<h1>My First Heading</h1>\n<p>My first paragraph.</p>`, css: ``, js: `` }
                    },
                    {
                        id: 'html-attributes',
                        title: 'Attributes',
                        difficulty: 'Beginner',
                        time: '12 min',
                        content: `<h2>HTML Attributes</h2><p>Attributes provide additional information about HTML elements.</p>`,
                        code: {
                            html: `<a href="https://roviotech.com">Visit Rovio Tech</a>`,
                            css: `a { color: #00E5FF; font-size: 20px; }`,
                            js: ``
                        }
                    }
                ]
            },
            {
                title: 'Forms & Input',
                lessons: [
                    {
                        id: 'html-forms',
                        title: 'Forms',
                        difficulty: 'Intermediate',
                        time: '15 min',
                        content: `<h2>HTML Forms</h2><p>The HTML <code>&lt;form&gt;</code> element is used to create an HTML form for user input.</p>`,
                        code: {
                            html: `<form>
   <label for="fname">First name:</label><br>
   <input type="text" id="fname" name="fname" value="John"><br>
   <label for="lname">Last name:</label><br>
   <input type="text" id="lname" name="lname" value="Doe"><br><br>
   <input type="submit" value="Submit">
 </form>`,
                            css: `input[type=text] { width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; }`,
                            js: ``
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'css',
        title: 'CSS',
        icon: "/images/css.png",
        color: 'text-blue-500',
        sections: [
            {
                title: 'Introduction',
                lessons: [
                    {
                        id: 'css-intro',
                        title: 'Introduction',
                        difficulty: 'Beginner',
                        time: '5 min',
                        content: `<h2>What is CSS?</h2><p>CSS stands for Cascading Style Sheets.</p>`,
                        code: { html: `<h1>Hello World</h1>`, css: `h1 { color: red; text-align: center; }`, js: `` }
                    },
                    {
                        id: 'css-syntax',
                        title: 'Syntax',
                        difficulty: 'Beginner',
                        time: '10 min',
                        content: `<h2>CSS Syntax</h2><p>A CSS rule consists of a selector and a declaration block.</p>`,
                        code: { html: `<p>Hello World!</p>`, css: `p { color: red; text-align: center; }`, js: `` }
                    }
                ]
            },
            {
                title: 'Layout',
                lessons: [
                    {
                        id: 'css-boxmodel',
                        title: 'Box Model',
                        difficulty: 'Intermediate',
                        time: '20 min',
                        content: `<h2>CSS Box Model</h2><p>All HTML elements can be considered as boxes.</p>`,
                        code: { html: `<div>This is a box</div>`, css: `div { width: 300px; border: 15px solid green; padding: 50px; margin: 20px; }`, js: `` }
                    },
                    {
                        id: 'css-flexbox',
                        title: 'Flexbox',
                        difficulty: 'Intermediate',
                        time: '25 min',
                        content: `<h2>CSS Flexbox</h2><p>The Flexible Box Layout Module.</p>`,
                        code: { html: `<div class="flex-container"><div>1</div><div>2</div><div>3</div></div>`, css: `.flex-container { display: flex; background-color: DodgerBlue; } .flex-container > div { background-color: #f1f1f1; margin: 10px; padding: 20px; font-size: 30px; }`, js: `` }
                    }
                ]
            }
        ]
    },
    {
        id: 'js',
        title: 'JavaScript',
        icon: "/images/javascript.png",
        color: 'text-yellow-400',
        sections: [
            {
                title: 'Basics',
                lessons: [
                    {
                        id: 'js-intro',
                        title: 'Introduction',
                        difficulty: 'Beginner',
                        time: '10 min',
                        content: `<h2>JavaScript Introduction</h2><p>JavaScript is the world's most popular programming language.</p>`,
                        code: { html: `<button onclick="myFunction()">Click Me!</button>\n<p id="demo"></p>`, css: ``, js: `function myFunction() { document.getElementById("demo").innerHTML = "Hello JS!"; }` }
                    }
                ]
            },
            {
                title: 'Objects & DOM',
                lessons: [
                    {
                        id: 'js-objects',
                        title: 'Objects',
                        difficulty: 'Intermediate',
                        time: '15 min',
                        content: `<h2>JavaScript Objects</h2><p>Real Life Objects, Properties, and Methods.</p>`,
                        code: { html: `<p id="demo"></p>`, css: ``, js: `const car = {type:"Fiat", model:"500", color:"white"};\ndocument.getElementById("demo").innerHTML = "The car type is " + car.type;` }
                    }
                ]
            }
        ]
    },
    {
        id: 'python',
        title: 'Python',
        icon: "/images/python.png",
        color: 'text-yellow-300',
        sections: [
            {
                title: 'Basics',
                lessons: [
                    { id: 'py-intro', title: 'Introduction', difficulty: 'Beginner', time: '5 min', content: '<p>Python is a popular programming language.</p>', code: { html: '', css: '', js: '// Preview Not Available' } },
                    { id: 'py-syntax', title: 'Syntax', difficulty: 'Beginner', time: '10 min', content: '<p>Python syntax can be executed by writing directly in the Command Line.</p>', code: { html: '', css: '', js: '' } }
                ]
            }
        ]
    },
    {
        id: 'java',
        title: 'Java',
        icon: "/images/java.png",
        color: 'text-red-400',
        sections: [
            {
                title: 'Basics',
                lessons: [
                    { id: 'java-intro', title: 'Introduction', difficulty: 'Beginner', time: '10 min', content: '<p>Java is a class-based, object-oriented programming language.</p>', code: { html: '', css: '', js: '' } }
                ]
            }
        ]
    },
    {
        id: 'cpp',
        title: 'C++',
        icon: "/images/cpp.png",
        color: 'text-blue-600',
        sections: [
            {
                title: 'Basics',
                lessons: [
                    { id: 'cpp-intro', title: 'Introduction', difficulty: 'Beginner', time: '10 min', content: '<p>C++ is a cross-platform language.</p>', code: { html: '', css: '', js: '' } }
                ]
            }
        ]
    },
    {
        id: 'sql',
        title: 'SQL',
        icon: "/images/SQL.png",
        color: 'text-blue-300',
        sections: [
            {
                title: 'Basics',
                lessons: [
                    { id: 'sql-intro', title: 'Introduction', difficulty: 'Beginner', time: '10 min', content: '<p>SQL is a standard language for storing, manipulating and retrieving data.</p>', code: { html: '', css: '', js: '' } },
                    { id: 'sql-select', title: 'SELECT', difficulty: 'Beginner', time: '10 min', content: '<p>The SELECT statement is used to select data from a database.</p>', code: { html: '', css: '', js: '' } }
                ]
            }
        ]
    }
];
