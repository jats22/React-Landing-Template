import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import { makeStyles } from '@material-ui/core/styles';
import {
    withRouter
} from 'react-router-dom'

import Chip from '@material-ui/core/Chip';
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

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


toast.configure()

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
    return <Chip {...props} label={props.label} className={classes.chip} component={props.children} />
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

// function Loader() {

//     // Start the changing images
//     const [counter, setCounter] = React.useState(0);

//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             setCounter(counter => (counter < 3) ? counter + 1 : 0);
//         }, 3000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, []);


//     return (
//         <div className="loader">
//             <div className="image">
//                 <i className={"fa " + iconList[counter || 0]}></i>
//             </div>
//             <span>
//                 <h2>
//                     {messageList[counter]}
//                 </h2>
//             </span>
//         </div>
//     )
// }

class Arena extends Component {

    state = {
        isLoading: true,
        quiz: null,
        userName: null,
        showTopics: true,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        console.log(this.props)

        const { location } = this.props;

        this.setState({
            isLoading: true,
            quiz: null,
        })

        if (location && location.state && location.state.profileObj) {
            const baseUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/";
            const loginUrl = baseUrl + "user/login?userId=" + location.state.profileObj.email;

            fetch(loginUrl, {
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    userDetails: location.state.profileObj,
                    // lastLoginTime: '' + new Date().today() + " @ " + new Date().timeNow(),
                })
            }
            )
                .then((data) => {
                    console.log(data)
                    this.setState({
                        userName: location.state.profileObj.name,
                    })
                    const baseQuizUrl = "https://api.npoint.io/"
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
                                    showTopics: false,
                                    isLoading: false,
                                })
                            })
                            .catch(e => {
                                console.log(e)
                                this.setState({
                                    isLoading: false,
                                    showTopics: true,
                                    errorMessage: "Oops! The quiz could not be fetched. Please explore other quizzes.",
                                    quiz: {},
                                })
                                toast.error(this.state.errorMessage)
                            })
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            quiz: null,
                        })
                    }

                })
                .catch(e => {
                    console.log(e)
                    toast.error("Ouch. We are having trouble logging you in.")
                })

        }

    }
    forceRender = () => {
        this.setState({
            isLoading: true,
            quiz: null,
            showTopics: false,
        })

        setTimeout(() => {
            this.setState({
                isLoading: false,
                quiz: null,
                showTopics: true,
            })
        }, 1000)


    }
    render() {
        const { isLoading, quiz, userName, showTopics, errorMessage } = this.state;
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
                                        <h3 style={{ textAlign: 'center', fontSize: '1.8em', padding: '50px', color: '#332c5c', fontWeight: '900' }}> Pick a quiz from these tracks</h3>
                                        <TopicListing isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} />
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
                                        Tag={Tag}
                                        showInstantFeedback={true}
                                        NextQuestion={NextQuestion}
                                        HoverRating={HoverRating}
                                        StartQuiz={StartQuiz}
                                        OptionButton={OptionButton} />
                                    <Footer />
                                </div>
                            }
                        </main>
                    </div>}

            </div>
        )
    }
}

export default withRouter(Arena);
