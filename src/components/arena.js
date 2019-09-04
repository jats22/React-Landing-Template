import React, { Component } from 'react';
import Quiz from 'react-quiz-component';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Nav from "./nav";
import HoverRating from "./rating";
import StartQuiz from "./start-quiz";
import OptionButton from "./option";
import NextQuestion from "./next-question";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

export function Tag(props) {
    const classes = useStyles();
    return <Chip {...props} label={props.label} className={classes.chip} />
}

const iconList = [
    "fa-graduation-cap",
    "fa-bolt",
    "fa-book-open",
    "fa-chalkboard-teacher",
]
const messageList = [
    "Selecting the best questions ... ",
    "Curated just for you!",
    "",
    "Almost there ...",
]

function Loader() {

    // Start the changing images
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter => (counter < 3) ? counter + 1 : 0);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className="loader">
            <div className="image">
                <i className={"fa " + iconList[counter || 0]}></i>
            </div>
            <span>
                <h2>
                    {messageList[counter]}
                </h2>
            </span>
        </div>
    )
}

// const quiz = {
//     "quizTitle": "Get ready for the Assessment",
//     "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
//     "questions": [
//         {
//             "question": "Two capacitors are connected in parallel through a switch. C1= 10pF, C2= 20pF. Initially the switch is open, C1 is charged to 6V. What happens if we close the switch? No losses in wires and capacitors. \n Image/Circuit here",
//             "questionBody": "Two capacitors are connected in parallel through a switch. C1= 10pF, C2= 20pF. Initially the switch is open, C1 is charged to 6V. What happens if we close the switch? No losses in wires and capacitors. \n Image/Circuit here",
//             "questionType": "text",
//             "explanation": "Let's breakdown the circuit. While the switch is open, the capacitor C1 is fully charged to the voltage supplied, V (which in this case is 5V)\n>By rule of thumb, **no losses in wires = no resistance in the circuit**\nWe know that charge across the capacitor, Q = CV\n On closing the switch, and getting rid of the source, the equivalent circuit now has two capacitors in parallel, but the charge stands to be the same.\n >Why? Law of conservation of charge. Q<sub>before</sub> = Q<sub>after</sub> \nC1 * V1  + C2 * V2 = (C1 + C2) * V3\n Couple of fundamentals to be observed here:\n * Caps in parallel Ceq = C1 + C2\n * Data we know, voltage on C1, cap values of C1 and C2.\n * Unknowns, V3, that is new voltage after we've created this new setup.\n V3 = (C1 * V1  + C2 * V2) / (C1 + C2)\n **V3 = 2V**\n What does this mean, voltage across the capacitors has now dropped (from 6V) to 2V when the switch was turned on.",
//             "answers":["x","y"],
//             "hint":"",
//             "correctAnswer":"2",
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//         }, 
//         {
//             "question": "How can you access the state of a component from inside of a member function?",
//             "questionType": "text",
//             "answerSelectionType": "single",
//             "answers": [
//                 "this.getState()",
//                 "this.prototype.stateValue",
//                 "this.state",
//                 "this.values"
//             ],
//             "incorrectAnswerMessages":{
//                 1:"reason 2",
//                 2:"sds",
//                 4:"sds",
//             },
//             "questionBody": "Optional description of the question",
//             "correctAnswer": "3",
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//             "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//             "point": "20"
//         },
//         {
//             "question": "ReactJS is an MVC based framework?",
//             "questionType": "text",
//             "answerSelectionType": "single",
//             "answers": [
//                 "True",
//                 "False"
//             ],
//             "correctAnswer": "2",
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//             "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//             "point": "10"
//         },
//         {
//             "question": "Which of the following concepts is/are key to ReactJS?",
//             "questionType": "text",
//             "answerSelectionType": "single",
//             "answers": [
//                 "Component-oriented design",
//                 "Event delegation model",
//                 "Both of the above",
//             ],
//             "correctAnswer": "3",
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//             "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//             "point": "30"
//         },
//         {
//             "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
//             "questionType": "photo",
//             "answerSelectionType": "single",
//             "answers": [
//                 "https://dummyimage.com/600x400/000/fff&text=A",
//                 "https://dummyimage.com/600x400/000/fff&text=B",
//                 "https://dummyimage.com/600x400/000/fff&text=C",
//                 "https://dummyimage.com/600x400/000/fff&text=D"
//             ],
//             "correctAnswer": "1",
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//             "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//             "point": "20"
//         },
//         {
//             "question": "What are the advantages of React JS?",
//             "questionType": "text",
//             "answerSelectionType": "multiple",
//             "answers": [
//                 "React can be used on client and as well as server side too",
//                 "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
//                 "React components have lifecycle events that fall into State/Property Updates",
//                 "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
//                 "This is correct",
//                 "This is correct"
//             ],
//             "correctAnswer": [1, 2, 4, 5, 6],
//             "messageForCorrectAnswer": "Correct answer. Good job.",
//             "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
//             "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//             "point": "20"
//         },
//     ]
// }

class Arena extends Component {

    state = {
        isLoading: true,
        quiz:null,
    }
    componentDidMount() {

        const url = "https://api.npoint.io/33103eea76083afe55b7";

        fetch(url)
        .then((resp) => resp.json()) 
        .then((data)=>{
            console.log(data)
            this.setState({
                quiz:data
            })
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                })
            }, 4000)
        })
        .catch(e =>{
            console.log(e)
        })

    }

    render() {
        const { isLoading,quiz } = this.state;
        return (
            <div className="container" >
                <Nav />
                <div style={{ margin: 'auto' }}>
                    {isLoading && <Loader />}
                </div>
                <main>
                    {!isLoading && <Quiz quiz={quiz} Tag={Tag} showInstantFeedback={true} NextQuestion={NextQuestion} HoverRating={HoverRating} StartQuiz={StartQuiz} OptionButton={OptionButton} />}
                </main>
            </div>
        )
    }
}

export default Arena;
