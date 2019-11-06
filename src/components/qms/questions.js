import React, { Component } from 'react';
import Stackedit from 'stackedit-js';
import Core from '../foundry/Core.jsx';
import { defaultLocale } from '../foundry/Locale.jsx';
import HoverRating from "../rating";
import { Tag } from "../arena";
import NextQuestion from "../next-question";
import Timer from "../timer";
import OptionButton from "../option";
import axios from 'axios';


function jsonIgnore(key, value) {
    if (key == "noOfOptions") return undefined;
    else if (key == "showQuestion") return undefined;
    else if (key == "_id") return undefined;
    else return value;
}


class QMS extends Component {


    constructor(props) {
        super(props)

        console.log(props)

        this.stackedit = new Stackedit();

        this.state = {
            question: "Type Question Text here. ",
            questionBody: "",
            explanation: "Type Explanation Text here. ",
            circuitText: "",
            questionType: "text",
            correctAnswer: "1",
            noOfOptions: "3",
            point: "10",
            answers: ["answer 1", " answer 2", " answer 3"],
            showQuestion: false,
            metaData: {},
        }
    }


    componentDidMount() {

        const { match: { params } } = this.props;

        if (params.questionId !== "new") {
            const fetchQuestionUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/question?questionId=" + params.questionId;
            fetch(fetchQuestionUrl)
                .then((resp) => resp.json())
                .then(question => {
                    console.log(question[0]);
                    this.setState(question[0]);
                })
                .catch(e => {
                    window.alert("No such question");
                    console.log(e);
                })
        }

        this.stackedit.on('fileChange', (file) => {
            if (file.name === 'questionText') {
                this.setState({
                    question: file.content.text,
                })
            }
            else if (file.name === 'explanationText') {
                this.setState({
                    explanation: file.content.text,
                })
            }
            else if (file.name === 'questionBodyText') {
                this.setState({
                    questionBody: file.content.text,
                })
            }
            else if (file.name === 'questionType') {
                this.setState({
                    questionType: file.content.text,
                })
            }
            else if (file.name === 'circuitText') {
                this.setState({
                    circuitText: file.content.text,
                })
            }
            else if (file.name === 'correctAnswer') {
                this.setState({
                    correctAnswer: file.content.text,
                })
            }
            else if (file.name === 'noOfOptions') {
                this.setState({
                    noOfOptions: parseInt(file.content.text),
                })
                if (!isNaN(this.state.noOfOptions)) {
                    this.setState({
                        answers: new Array(this.state.noOfOptions)
                    })
                }
            }
            else if (file.name === 'metaData') {
                this.setState({
                    metaData: JSON.parse(file.content.text),
                })
            }
            else if (file.name === 'point') {
                this.setState({
                    point: file.content.text,
                })
            }
        });

    }

    render() {
        const { question, questionBody, explanation, circuitText, questionType, correctAnswer, point, noOfOptions, showQuestion, metaData } = this.state;

        return (
            <main className="preview">
                <section>
                    <h3 onClick={() => {
                        // Open the iframe
                        this.stackedit.openFile({
                            name: 'questionText', // with an optional filename
                            content: {
                                text: this.state.question // and the Markdown content.
                            }
                        });

                    }}
                    > Question: </h3>
                    <textarea value={question}></textarea>
                </section>

                <section>
                    <h3 onClick={() => {
                        // Open the iframe
                        this.stackedit.openFile({
                            name: 'questionBodyText', // with an optional filename
                            content: {
                                text: this.state.questionBody // and the Markdown content.
                            }
                        });

                    }}

                    >QuestionBody: </h3>
                    <textarea value={questionBody}></textarea>
                </section>

                <section>
                    <h3 onClick={() => {
                        // Open the iframe
                        this.stackedit.openFile({
                            name: 'questionType', // with an optional filename
                            content: {
                                text: this.state.questionType // and the Markdown content.
                            }
                        });

                    }}
                    >QuestionType: </h3>
                    <textarea value={questionType}></textarea>
                </section>


                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'explanationText', // with an optional filename
                                content: {
                                    text: this.state.explanation // and the Markdown content.
                                }
                            });
                        }}

                    >Explanation: </h3>
                    <textarea value={explanation}></textarea>
                </section>

                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'circuitText', // with an optional filename
                                content: {
                                    text: this.state.circuitText // and the Markdown content.
                                }
                            });
                        }}

                    >CircuitText: </h3>
                    <textarea value={circuitText}></textarea>
                </section>

                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'point', // with an optional filename
                                content: {
                                    text: this.state.point // and the Markdown content.
                                }
                            });
                        }}

                    >Point: </h3>
                    <textarea value={point}></textarea>
                </section>

                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'metaData', // with an optional filename
                                content: {
                                    text: JSON.stringify(this.state.metaData, null, 2) // and the Markdown content.
                                }
                            });
                        }}

                    >metaData: </h3>
                    <textarea value={JSON.stringify(metaData, null, 2)}></textarea>
                </section>

                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'correctAnswer', // with an optional filename
                                content: {
                                    text: this.state.correctAnswer // and the Markdown content.
                                }
                            });
                        }}

                    >CorrectAnswer: </h3>
                    <textarea value={correctAnswer}></textarea>
                </section>

                <section>
                    <h3
                        onClick={() => {
                            // Open the iframe
                            this.stackedit.openFile({
                                name: 'noOfOptions', // with an optional filename
                                content: {
                                    text: this.state.noOfOptions // and the Markdown content.
                                }
                            });
                        }}

                    >noOfOptions: </h3>
                    <textarea value={noOfOptions}></textarea>
                    <ul style={{ display: 'block' }}>
                        {parseInt(noOfOptions) > 0 && [...new Array(parseInt(noOfOptions))].map((item, index) => <li>
                            <label for={index}>Answer : {index} </label>
                            <input name={index} placeholder={this.state.answers[index]} onChange={e => {
                                // console.log(e.target.value);
                                let answers = this.state.answers;
                                answers[index] = e.target.value;
                                this.setState({
                                    answers: answers,
                                })
                            }
                            } />
                        </li>)
                        }
                    </ul>

                </section>
                <section>
                    <h3>Generated json: </h3>
                    <h3>{JSON.stringify(this.state, jsonIgnore, 2)}</h3>
                </section>
                <section>
                    <button onClick={() => {
                        this.setState({
                            showQuestion: true,
                        })
                    }}>
                        <h3
                        >Preview </h3>
                    </button>
                </section>

                <section>
                    <button onClick={() => {
                        const { match: { params } } = this.props;
                        const saveQuestionUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/question";
                        if (params.questionId !== "new") {


                            fetch(saveQuestionUrl, {
                                mode: 'cors',
                                // headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({
                                    "questionId": params.questionId,
                                    "question": this.state,
                                },jsonIgnore)
                            }
                            )
                                .then(() => window.alert("Saved!"))
                                .catch(() => window.alert("Backend Error!"))
                        }
                        else {
                            fetch(saveQuestionUrl, {
                                mode: 'cors',
                                // headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({
                                    "questionId": "",
                                    "question": this.state,
                                },jsonIgnore)
                            }
                            )
                                .then((resp) => resp.json())
                                .then((Id) => {
                                    window.alert("Saved with Id: " + Id);
                                    this.props.history.push('./' + Id)

                                })
                                .catch((e) => { window.alert("Backend Error!") })
                        }
                    }}
                    >
                        <h3> Save/Update </h3>
                    </button>
                </section>

                <div style={{ width: '100%', margin: '0 auto' }}>

                    {showQuestion &&
                        <div className="react-quiz-container">
                            <Core
                                userName={"test"}
                                quizId={"test"}
                                userId={"test"}
                                questions={[this.state]}
                                Timer={Timer}
                                NextQuestion={NextQuestion}
                                OptionButton={OptionButton}
                                HoverRating={HoverRating}
                                showDefaultResult={true}
                                Tag={Tag}
                                previewMode
                                showInstantFeedback={true}
                                appLocale={defaultLocale}
                            />
                        </div>
                    }
                </div>

            </main>)
    }
}

export default QMS;