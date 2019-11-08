import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Loader from 'react-loader-spinner'

import MarkdownRender from '../common/markdown-render'
import Tag from '../common/tag';
import TI from '../../images/ti.png';
import DiagnosticAnalysis from '../diagnostic-analysis';
import 'github-markdown-css'

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      endQuiz: false,
      currentQuestionIndex: 0,
      buttons: {},
      buttonClasses: {},
      correct: [],
      incorrect: [],
      userInput: [],
      filteredValue: 'all',
      userAttempt: 1,
      showDefaultResult: this.props.showDefaultResult != undefined ? this.props.showDefaultResult : true,
      onComplete: this.props.onComplete != undefined ? this.props.onComplete : null,
      customResultPage: this.props.customResultPage != undefined ? this.props.customResultPage : null,
      showInstantFeedback: this.props.showInstantFeedback != undefined ? this.props.showInstantFeedback : false,
      continueTillCorrect: this.props.continueTillCorrect != undefined ? this.props.continueTillCorrect : false
    };
  }

  checkAnswer = (index, correctAnswer, answerSelectionType) => {
    const { correct, incorrect, currentQuestionIndex, continueTillCorrect, userInput } = this.state;
    let { userAttempt, showNextQuestionButton } = this.state;

    if (answerSelectionType == 'single') {
      if (userInput[currentQuestionIndex] == undefined) {
        userInput.push(index)
      }

      if (index == correctAnswer) {
        if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }

        let disabledAll = {
          0: { disabled: true },
          1: { disabled: true },
          2: { disabled: true },
          3: { disabled: true }
        }

        this.setState((prevState) => {
          const buttons = Object.assign(
            {},
            prevState.buttons,
            {
              ...disabledAll,
              [index - 1]: {
                className: (index == correctAnswer) ? "correct" : "incorrect"
              },
            }
          );
          return { buttons };
        })

        this.setState({
          correctAnswer: true,
          incorrectAnswer: false,
          correct: correct,
          showNextQuestionButton: true,
        })
      } else {
        if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
          incorrect.push(currentQuestionIndex)
        }

        if (continueTillCorrect) {
          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                [index - 1]: {
                  disabled: !prevState.buttons[index - 1]
                }
              }
            );
            return { buttons };
          });
        } else {
          let disabledAll = {
            0: { disabled: true },
            1: { disabled: true },
            2: { disabled: true },
            3: { disabled: true }
          }

          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                ...disabledAll,
                [index - 1]: {
                  className: (index == correctAnswer) ? "correct" : "incorrect"
                },
              }
            );
            return { buttons };
          })

          this.setState({
            showNextQuestionButton: true,
          })
        }

        this.setState({
          incorrectAnswer: true,
          correctAnswer: false,
          incorrect: incorrect,
        })
      }
    } else {

      let maxNumberOfMultipleSelection = correctAnswer.length;

      if (userInput[currentQuestionIndex] == undefined) {
        userInput[currentQuestionIndex] = []
      }

      if (userInput[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
        userInput[currentQuestionIndex].push(index)

        if (correctAnswer.includes(index)) {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {

            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    disabled: !prevState.buttons[index - 1],
                    className: (correctAnswer.includes(index)) ? "correct" : "incorrect"
                  },
                }
              );
              return { buttons };
            })


          }
        } else {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    className: (correctAnswer.includes(index)) ? "correct" : "incorrect"
                  },
                }
              );
              return { buttons };
            })
          }
        }
      }

      if (maxNumberOfMultipleSelection == userAttempt) {
        let cnt = 0;
        for (var i = 0; i < correctAnswer.length; i++) {
          if (userInput[currentQuestionIndex].includes(correctAnswer[i])) {
            cnt++;
          }
        }

        if (cnt == maxNumberOfMultipleSelection) {
          correct.push(currentQuestionIndex);
          this.setState({
            correctAnswer: true,
            incorrectAnswer: false,
            correct: correct,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        } else {
          incorrect.push(currentQuestionIndex)
          this.setState({
            incorrectAnswer: true,
            correctAnswer: false,
            incorrect: incorrect,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        }
      } else {
        if (!showNextQuestionButton) {
          this.setState({
            userInput,
            userAttempt: userAttempt + 1
          })
        }
      }
    }
  }

  nextQuestion = (currentQuestionIndex) => {
    const { questions, userName, userId, quizId, previewMode } = this.props;

    var initState = {
      incorrectAnswer: false,
      isLoading: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      buttons: {},
    }
    this.setState({
      isLoading: true,
    })

    setTimeout(() => {
      if (currentQuestionIndex + 1 == questions.length) {
        if (!previewMode) {
          window.analytics.track("User Completed Quiz", {
            "quizId": quizId,
          });
        }

        const quizResponseUrl = "https://asia-east2-ciruital-prod-254903.cloudfunctions.net/qmsapi/" + "user/quiz";
        fetch(quizResponseUrl, {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            userId: userId || "sandilya.jatin@gmail.com",
            quizId: quizId,
            response: {
              input: this.state.userInput,
              timings: this.state.userTimings,
              ratings: this.state.userRatings,
            }
          })
        }
        ).then(d => console.log(d))
          .catch(e => console.log(e))

        this.setState({
          ...initState,
          endQuiz: true
        })
      } else {
        this.setState({
          ...initState,
          currentQuestionIndex: currentQuestionIndex + 1,
        })
      }
    }, 700)

  }

  renderMessageforCorrectAnswer = (question) => {
    const defaultMessage = 'You are correct. Please click Next to continue.';
    return question.messageForCorrectAnswer || defaultMessage;
  }

  renderMessageforIncorrectAnswer = (question) => {
    const defaultMessage = 'Incorrect answer. Please try again.';
    return question.messageForIncorrectAnswer || defaultMessage;
  }

  renderExplanation = (question, isResultPage) => {
    const explanation = question.explanation;
    const circuitText = question.circuitText;
    if (!explanation) {
      return (null);
    }

    if (isResultPage) {
      return (
        <div className="explaination">
          <MarkdownRender source={explanation} />
        </div>
      )
    }

    return (
      <div>
        <div>
          <MarkdownRender source={explanation} />
          {/* <br/> */}
          {/* {this.rawMarkup(explanation)} */}
        </div>
        {circuitText &&
          <div>
            <iframe frameborder="0" width='100%' height='500px' src={process.env.PUBLIC_URL + "/war/circuitjs.html?whiteBackground=true&cct=" + circuitText}></iframe>
          </div>
        }
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({ filteredValue: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuestionIndex != this.state.currentQuestionIndex) {
      // console.log("this works")
      // this.props.Timer.toggle()
    }
  }

  renderQuizResultFilter = () => {
    const { appLocale } = this.props;
    return (
      <div className="quiz-result-filter">
        <select value={this.state.filteredValue} onChange={this.handleChange}>
          <option value="all">{appLocale.resultFilterAll}</option>
          <option value="correct">{appLocale.resultFilterCorrect}</option>
          <option value="incorrect">{appLocale.resultFilterIncorrect}</option>
        </select>
      </div>
    );
  }

  renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    let answerBtnCorrectClassName;
    let answerBtnIncorrectClassName;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      if (answerSelectionType == 'single') {
        answerBtnCorrectClassName = (index + 1 == correctAnswer ? ' correct ' : '')
        answerBtnIncorrectClassName = (userInputIndex != correctAnswer && index + 1 == userInputIndex ? ' incorrect ' : '')
      } else {
        answerBtnCorrectClassName = (correctAnswer.includes(index + 1) ? ' correct ' : '')
        answerBtnIncorrectClassName = (!correctAnswer.includes(index + 1) && userInputIndex.includes(index + 1) ? ' incorrect ' : '')
      }

      return (
        <div key={index}>
          <button disabled={true} className={"answerBtn btn " + answerBtnCorrectClassName + answerBtnIncorrectClassName}>
            {questionType == 'text' && <span><MarkdownRender source={answer} /></span>}
            {questionType == 'photo' && <img src={answer} />}
          </button>
        </div>
      )
    });
  }

  renderQuizResultQuestions = () => {
    const { filteredValue } = this.state;
    let { userInput } = this.state;
    let { questions } = this.props;

    if (filteredValue != 'all') {
      questions = questions.filter((question, index) => {
        return this.state[filteredValue].indexOf(index) != -1
      })

      userInput = userInput.filter((input, index) => {
        return this.state[filteredValue].indexOf(index) != -1
      })
    }

    return questions.map((question, index) => {
      const userInputIndex = userInput[index];

      // Default single to avoid code breaking due to automatic version upgrade
      let answerSelectionType = question.answerSelectionType || 'single';

      return (
        <div className="result-answer-wrapper" key={index + 1}>

          <h3><MarkdownRender source={`Q${question.questionIndex}: ${question.question})`} /></h3>
          {
            this.renderTags(answerSelectionType, question.correctAnswer.length)
          }
          <div className="result-answer">
            {
              this.renderAnswerInResult(question, userInputIndex)
            }
          </div>
          {this.renderExplanation(question, true)}
        </div>
      )
    })
  }

  rawMarkup = (data) => {
    let rawMarkup = marked(data, { breaks: true, smartLists: true, smartypants: true });
    return { __html: rawMarkup };
  }

  renderAnswers = (question, buttons) => {
    const { answers, correctAnswer, questionType } = question;
    const { OptionButton } = this.props;

    let { answerSelectionType } = question;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      if (buttons[index] != undefined) {
        return (
          <div key={index}>
            <OptionButton disabled={buttons[index].disabled || false}
              answer={
                questionType == 'text' ?
                  answer
                  :
                  { __html: <img src={answer} /> }
              }
              className={`${buttons[index].className} answerBtn btn`}
              onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)}
            />
          </div>
        )
      } else {
        return (
          <div key={index}>
            <OptionButton
              answer={

                questionType == 'text' ?
                  answer
                  :
                  { __html: <img src={answer} /> }
              }
              className="answerBtn btn"
              onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)}
            />
          </div>
        )
      }
    })
  }

  renderTags(answerSelectionType, numberOfSelection, companyCodes) {
    const {
      appLocale: {
        singleSelectionTagText,
        multipleSelectionTagText,
        pickNumberOfSelection,
      }
    } = this.props;

    return (
      <div className="tag-container">
        {
          answerSelectionType == 'single'
        }
        {
          answerSelectionType == 'multiple' && <Tag label={multipleSelectionTagText} color="primary" />
        }
        <Tag color="primary" label={pickNumberOfSelection.replace("<numberOfSelection>", numberOfSelection)} />
        {
          companyCodes
          &&
          companyCodes.map(company => {
            // Todo : Move to CDN. & Backend when data is available.
            if (company === "TI")
              return <Tag color="default" variant="outlined" avatar={{ alt: 'Asked in', img: TI }} label="Texas Instruments" />
          }
          )
        }

      </div>
    )
  }

  captureTime = (minutes, seconds) => {
    let userTimings = this.state.userTimings || []
    userTimings.push((minutes * 60) + seconds)
    this.setState({
      userTimings: userTimings
    })

    console.log(this.state)
  }

  captureRating = (rating) => {
    let userRatings = this.state.userRatings || []
    userRatings.push(rating)
    this.setState({
      userRatings: userRatings
    })

    console.log(this.state)
  }

  render() {
    const { questions, appLocale, Timer, HoverRating, previewMode, captureRating, NextQuestion } = this.props;
    const {
      correct,
      incorrect,
      userInput,
      currentQuestionIndex,
      correctAnswer,
      incorrectAnswer,
      endQuiz,
      showInstantFeedback,
      buttons,
      onComplete,
      showNextQuestionButton,
      showDefaultResult,
      customResultPage,
      isLoading,
    } = this.state;

    let question = questions[currentQuestionIndex];
    let totalPoints = 0;
    let correctPoints = 0;

    for (var i = 0; i < questions.length; i++) {
      let point = questions[i].point || 0;
      if (typeof point === 'string' || point instanceof String) {
        point = parseInt(point)
      }

      totalPoints = totalPoints + point;

      if (correct.includes(i)) {
        correctPoints = correctPoints + point;
      }
    }

    var topicScore = {}
    var maxScore = 1
    var worstTopic = ""
    for (var i = 0; i < incorrect.length; i++) {
      let topic = questions[incorrect[i]].topic || "";
      if (!topicScore[topic])
        topicScore[topic] = 1
      else topicScore[topic]++;
      if (topicScore[topic] > maxScore) {
        maxScore = topicScore[topic]
        worstTopic = topic
      }
    }

    const questionSummary = {
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions: questions,
      userInput: userInput,
      totalPoints: totalPoints,
      correctPoints: correctPoints,
      worstTopic: worstTopic,
    };

    let { answerSelectionType } = question;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    let { companyCodes } = question.metaData || {};

    return (
      <div className={showNextQuestionButton && !isLoading ? "questionWrapper" : (endQuiz ? "questionWrapper " + "End" : "questionWrapper " + "slide")}>
        {!endQuiz &&
          isLoading ? <Loader
            type="ThreeDots"
            color="#362f6e"
            style={{ textAlign: 'center' }}
            height={'60vh'}
            width={60} />
          :
          (!endQuiz && <div className="questionWrapperBody">
            <div>
              <div className="questionModal">
                {incorrectAnswer && showInstantFeedback &&
                  <div className="alert incorrect">{this.renderMessageforIncorrectAnswer(question)}</div>
                }
                {correctAnswer && showInstantFeedback &&
                  <div className="alert correct">
                    {this.renderMessageforCorrectAnswer(question)}
                  </div>
                }
              </div>
              <h3>{appLocale.question} {currentQuestionIndex + 1}:</h3>
              <h2> <MarkdownRender source={question.question} /> </h2>
              {question.questionBody && <div><MarkdownRender source={question.questionBody} /></div>}
              {
                <div>
                  {this.renderTags(answerSelectionType, question.correctAnswer.length, companyCodes)}

                  {!previewMode && <Timer key={currentQuestionIndex} pause={showNextQuestionButton} captureTime={this.captureTime} />}
                </div>
              }
              {
                this.renderAnswers(question, buttons)
              }


              {showNextQuestionButton && !previewMode &&
                <div>
                  <div>
                    <NextQuestion onClick={() => this.nextQuestion(currentQuestionIndex)} className="nextQuestionBtn btn" >
                      {appLocale.nextQuestionBtn}
                    </NextQuestion>
                  </div>
                  <div className="rating" >
                    <this.props.HoverRating captureRating={this.captureRating} />
                  </div>
                </div>
              }
            </div>
          </div>)
        }
        {showNextQuestionButton && !isLoading &&
          <div className="explaination markdown-body">
            <h3>Explanation: </h3>
            {this.renderExplanation(question, false)}
          </div>
        }
        {endQuiz && showDefaultResult && customResultPage == null &&
          <div className="card-body">
            <h1>
              {appLocale.resultPageHeaderText.replace("<correctPoints>", correctPoints).replace("<totalPoints>", totalPoints)}
            </h1>
            <h2 className="resultSuggestion">
              &#128214; <span className="worstTopic"> <Tag color="secondary" component="a" href="/arena?quizId=locked" clickable label={worstTopic} /></span> should be your top focus item!
            </h2>
            <h3 style={{textAlign:'center'}}>
              {appLocale.resultPagePoint.replace("<correctIndexLength>", correct.length).replace("<questionLength>", questions.length)}
            </h3>
            <br />
            <DiagnosticAnalysis/>
            {this.renderQuizResultQuestions()}
          </div>
        }

        {
          endQuiz && onComplete != undefined &&
          onComplete(questionSummary)
        }

        {
          endQuiz && !showDefaultResult && customResultPage != undefined &&
          customResultPage(questionSummary)
        }
      </div>
    );
  }
}

Core.propTypes = {
  questions: PropTypes.array,
  showDefaultResult: PropTypes.bool,
  onComplete: PropTypes.func,
  customResultPage: PropTypes.func,
  showInstantFeedback: PropTypes.bool,
  continueTillCorrect: PropTypes.bool,
  appLocale: PropTypes.object
};

export default Core;
