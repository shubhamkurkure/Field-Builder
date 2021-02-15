import React from "react";

class Choice extends React.Component {

    choiceBeingUpdated;

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.choice.title,
            updateMode: false
        }
        this.choiceBeingUpdated = this.props.choice.title;

    }

    togglePreview = () => {
        this.setState(state => ({
            updateMode: !state.updateMode
        }))
    };

    titleChangeHandler = (event) => {
        this.setState({
                          title: event.target.value
                      })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.choice.title !== this.props.choice.title) {
            this.setState({
                              title: this.props.choice.title
                          })
        }
    }

    render() {
        let choiceStyle;

        if (this.props.defaultSelection) {
            choiceStyle = {background: "lightgrey", margin: "5px"}
        } else {
            choiceStyle = {background: "white", margin: "5px"}
        }

        return (
            <div className={"row rounded"} style={choiceStyle}>
                {
                    !this.state.updateMode &&
                    <div className={"col-sm-8 wbdv-padding"}>
                        {this.state.title}
                    </div>
                }

                {
                    this.state.updateMode &&
                    <div className={"col-sm-8 wbdv-padding"}>
                        <input className="form-control" value={this.state.title}
                               onChange={this.titleChangeHandler}/>
                    </div>
                }


                {
                    !this.state.updateMode &&
                    <div className={"col-sm-2 wbdv-padding"}>
                        <h5><i className={"pull-right fa fa-pencil"} onClick={() => {
                            this.choiceBeingUpdated = this.state.title;
                            this.togglePreview();
                        }}>
                        </i></h5>
                    </div>

                }

                {
                    this.state.updateMode &&
                    <div className={"col-sm-2 wbdv-padding"}>
                        <h5><i className={"pull-right fa fa-check"}
                                onClick={() => {
                                    if (!this.props.updateChoice(this.props.index, this.state.title,
                                                                 this.choiceBeingUpdated)) {
                                        this.setState({
                                                          title: this.choiceBeingUpdated
                                                      })
                                    }
                                    this.togglePreview();
                                }}>
                        </i></h5>
                    </div>
                }

                <div className={"col-sm-2 wbdv-padding"}>
                    <h5><i className={"pull-right fa fa-times"} onClick={() =>
                        this.props.deleteChoice(this.props.index)}>
                    </i></h5>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Choice;
