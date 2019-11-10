import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class QuestionList extends Component {

    state = {
        questions: []
    }

    componentDidMount() {
        const fetchQuestionsUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/question";
        fetch(fetchQuestionsUrl)
            .then((resp) => resp.json())
            .then(questions => {
                console.log(questions);
                this.setState({
                    questions: questions,
                });
            })
            .catch(e => {
                window.alert("No questions in repository.");
                console.log(e);
            })

    }

    render() {
        const { questions } = this.state;
        console.log(questions);
        return (
            <main>
                <section style={{
                    gridTemplateColumns: '1fr',
                    textAlign: 'left',
                    textDecoration: 'underline'
                }}>
                    <h3>List of All questions in repository: </h3>
                    <ul>
                        {questions.map(question => { return <li> <Link to={"/qms/question/" + question._id}>{question.question}</Link></li> })}
                    </ul>
                </section>
            </main>
        )
    }
}

export default QuestionList;