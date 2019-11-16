import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import {
    withRouter
} from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from "./nav";
import HoverRating from "./rating";
import StartQuiz from "./start-quiz";
import OptionButton from "./option";
import NextQuestion from "./next-question";
import Timer from "./timer";
import TopicListing from "./topic-listing";
import Footer from "./footer";
import Quiz from './foundry/Quiz';
import { withCookies, Cookies } from 'react-cookie';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


toast.configure()


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


class Arena extends Component {

    state = {
        isLoading: true,
        quiz: null,
        quizId: null,
        userName: null,
        showTopics: true,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { cookies } = this.props;
        this.setState({
            userName: cookies.get('circuital_user_name'),
        })
        this.fetchQuiz();
    }

    fetchQuiz = () => {
        console.log(this.props)

        this.setState({
            isLoading: true,
            quiz: null,
        })

        const baseQuizUrl = "https://api.npoint.io/"
        const { location, cookies } = this.props;

        if (location && location.search) {

            const params = new URLSearchParams(location.search)
            const quizId = params.get('quizId')

            var url = baseQuizUrl + quizId;
            console.log(url)
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    this.setState({
                        quiz: data,
                        quizId: quizId,
                        showTopics: false,
                        isLoading: false,
                        userName: cookies.get('circuital_user_name'),
                    })
                })
                .catch(e => {
                    console.log(e)
                    this.setState({
                        isLoading: false,
                        showTopics: true,
                        errorMessage: "Oops! The quiz could not be fetched. Please explore other quizzes.",
                        quiz: {},
                        userName: cookies.get('circuital_user_name'),
                    })
                    toast.error(this.state.errorMessage)
                })
        }
        else {
            this.setState({
                isLoading: false,
                quiz: null,
                showTopics: true,
                userName: cookies.get('circuital_user_name'),
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.fetchQuiz()
        }
    }

    forceRender = () => {
        this.setState({
            isLoading: true,
            quiz: null,
            showTopics: false,
        })

        console.log("called")

        setTimeout(() => {
            this.setState({
                isLoading: false,
                quiz: null,
                showTopics: true,
            })
        }, 1000)


    }
    render() {
        const { isLoading, quiz, quizId, userName, userId, showTopics, errorMessage } = this.state;
        console.log(this.props)
        console.log(this.state)
        return (
            <div className="container" >
                <Nav arena userName={userName} forceRender={this.forceRender} />
                {showTopics &&
                    <div>
                        <div style={{ margin: 'auto' }}>
                            {isLoading && <Loader
                                type="ThreeDots"
                                color="#362f6e"
                                style={{ textAlign: 'center' }}
                                height={'60vh'}
                                width={60} />
                            }
                        </div>
                        <main>

                            {!isLoading &&
                                <div>
                                    <section className="topics-list" >
                                        <h3 style={{ textAlign: 'left', fontSize: '1.8em', padding: '50px 50px 50px 40px', color: '#332c5c', fontWeight: '600' }}> Pick a quiz from these tracks</h3>
                                        <TopicListing isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} forceRender={this.forceRender} />
                                    </section>
                                    <Footer />
                                </div>
                            }

                        </main>
                    </div>}
                {!showTopics &&
                    <div style={{ minHeight: '90%' }}>
                        <div style={{ margin: 'auto' }}>
                            {isLoading && <Loader
                                type="ThreeDots"
                                color="#362f6e"
                                style={{ textAlign: 'center' }}
                                height={'60vh'}
                                width={60} />}
                        </div>
                        <main>
                            {!isLoading && quiz &&
                                <div>
                                    <Quiz
                                        quiz={quiz}
                                        Timer={Timer}
                                        userName={userName}
                                        quizId={quizId}
                                        userId={userId}
                                        // shuffle={true}
                                        // showInstantFeedback={true}
                                        NextQuestion={NextQuestion}
                                        HoverRating={HoverRating}
                                        StartQuiz={StartQuiz}
                                        OptionButton={OptionButton} />
                                    {/* <Footer /> */}
                                </div>
                            }
                        </main>
                    </div>}

            </div>
        )
    }
}

export default withCookies(withRouter(Arena));
