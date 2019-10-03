import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Quiz from 'react-quiz-component';
import { makeStyles } from '@material-ui/core/styles';
import {
    withRouter
} from 'react-router-dom'

import Chip from '@material-ui/core/Chip';
import Nav from "./nav";
import HoverRating from "./rating";
import StartQuiz from "./start-quiz";
import OptionButton from "./option";
import NextQuestion from "./next-question";
import Timer from "./timer";
import TopicListing from "./topic-listing";
import Footer from "./footer";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

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
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        const url = "https://api.npoint.io/33103eea76083afe55b7";

        console.log(this.props)
        const { location } = this.props;
        if (location && location.search) {
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    this.setState({
                        quiz: data
                    })
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                        })
                    }, 4000)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                })
            }, 1000)
        }


    }

    render() {
        const { isLoading, quiz } = this.state;
        return (
            <div className="container" >
                <Nav arena />
                {!quiz &&
                    <div>
                        <div style={{ margin: 'auto' }}>
                            { isLoading && <Loader
                                type="ThreeDots"
                                color="#6057a0"
                                style={{textAlign:'center'}}
                                height={'60vh'}
                                width={60}/>
                            }
                        </div>
                        <main>
                            {!isLoading &&
                                <div>
                                    <section className="topics-list" >
                                        <h3 style={{ textAlign: 'center', fontSize: 'x-large', padding: '50px', color: '#332c5c' }}> Pick a quiz from these tracks</h3>
                                        <TopicListing isAuthenticated={this.props.isAuthenticated} signIn={this.props.signIn} showAuth={this.props.showAuth} />
                                    </section>
                                    <Footer />
                                </div>
                            }

                        </main>
                    </div>}
                {quiz &&
                    <div>
                        <div style={{ margin: 'auto' }}>
                            {isLoading && <Loader />}
                        </div>
                        <main>
                            {!isLoading && quiz && <Quiz quiz={quiz} Timer={Timer} Tag={Tag} showInstantFeedback={true} NextQuestion={NextQuestion} HoverRating={HoverRating} StartQuiz={StartQuiz} OptionButton={OptionButton} />}
                        </main>
                    </div>}

            </div>
        )
    }
}

export default withRouter(Arena);
