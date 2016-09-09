var React = require('react');
var Display = require('./parts/Display');
var JoinSpeakerForm = require('./parts/JoinSpeakerForm');
var AudienceList = require('./parts/AudienceList');
var QuestionList = require('./parts/QuestionList');


var Speaker = React.createClass({
    getInitialState() {
        return {
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: ""
        };
    },

    addQuestion() {
        const {question, optionA, optionB, optionC, optionD} = this.refs;
        const allQuestions = this.props.questions;
        allQuestions.push({q: question.value, a: optionA.value, b: optionB.value, c: optionC.value, d: optionD.value});

        this.props.emit("addQuestion", allQuestions);

        this.setState(this.getInitialState());
    },

    updateQuestion() {
        this.setState({
            question: this.refs.question.value,
            optionA: this.refs.optionA.value,
            optionB: this.refs.optionB.value,
            optionC: this.refs.optionC.value,
            optionD: this.refs.optionD.value
        });
    },

    render() {
        const {question, optionA, optionB, optionC, optionD} = this.state;

        return (
            <Display if={this.props.status === 'connected'}>
                <Display if={this.props.member.type === 'speaker'}>
                    <QuestionList
                        questions={this.props.questions}
                        emit={this.props.emit}
                    />
                    <AudienceList audience={this.props.audience} />
                </Display>

                <Display if={this.props.member.type !== 'speaker'}>
                    <JoinSpeakerForm emit={this.props.emit}/>
                </Display>
                <input
                    type="text"
                    ref="question"
                    value={question}
                    onChange={this.updateQuestion}
                    placeholder="Question"
                />
                <input
                    type="text"
                    ref="optionA"
                    value={optionA}
                    onChange={this.updateQuestion}
                    placeholder="Answer: option A"
                />
                <input
                    type="text"
                    ref="optionB"
                    value={optionB}
                    onChange={this.updateQuestion}
                    placeholder="Answer: option B"
                />
                <input
                    type="text"
                    ref="optionC"
                    value={optionC}
                    onChange={this.updateQuestion}
                    placeholder="Answer: option C"
                />
                <input
                    type="text"
                    ref="optionD"
                    value={optionD}
                    onChange={this.updateQuestion}
                    placeholder="Answer: option D"
                />
                <button onClick={this.addQuestion}>Send</button>
            </Display>
        )

    }

})


module.exports = Speaker;
