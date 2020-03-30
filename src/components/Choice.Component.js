import React from "react";

class Choice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title : this.props.choice.title,
            updateMode : false
        }

    }

    togglePreview = () => {
        this.setState(state =>({
            updateMode: !state.updateMode
        }))
    }

    titleChangeHandler = (event) => {
        this.setState({
            title : event.target.value
                      })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.choice.title !== this.props.choice.title) {
            this.setState({
                title : this.props.choice.title
                          })
        }
    }

    render() {
        let choiceStyle;

        if(this.props.defaultSelection) {
            choiceStyle = {background : "lightgrey"};
        } else {
            choiceStyle = {background : "white"}
        }

        return (
            <div className={"row rounded"} style = {choiceStyle}>
                {
                    !this.state.updateMode &&
                    <div className={"col-sm-6"}>
                        <h5>{this.state.title}</h5>
                    </div>
                }

                {
                    this.state.updateMode &&
                    <div className={"col-sm-6"}>
                        <input className="form-control" value={this.state.title} onChange={this.titleChangeHandler}/>
                    </div>
                }


                {
                    !this.state.updateMode &&
                    <div className={"col-sm-2"}>
                        <button type={"button"} className={"btn btn-primary"} onClick={()=>{
                            this.togglePreview();
                        }}>Update</button>
                    </div>

                }

                {
                    this.state.updateMode &&
                    <div className={"col-sm-2"}>
                        <button type={"button"} className={"btn btn-primary"} onClick={()=>{
                            if(!this.props.updateChoice(this.props.index, this.state.title)) {
                                this.setState({
                                    title : this.choiceBeingUpdated
                                              })
                            };
                            this.togglePreview();
                        }}>Done</button>
                    </div>
                }

                <div className={"col-sm-2"}>
                    <button type={"button"} className={"btn btn-danger"} onClick={()=>
                        this.props.deleteChoice(this.props.index)}>Delete</button>
                </div>
                <br/>
                <br/>
            </div>
        )
    }
}

export default Choice;
