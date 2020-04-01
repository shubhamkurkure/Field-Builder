import React from "react";
import Choice from "./Choice.Component";
import ChoicePreview from "./ChoicePreview.Comonent";
import fieldService from "../services/field.service";

class FieldBuilder extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            label : "",
            selectType : "singleSelect",
            selectTypeCheckBoxState : false,
            currentSelectedChoice : -1,
            defaultValue : "",
            choices : [],
            preview : false,
            ordering : "No ordering"
        }
    }

    labelChangeHandler = (event) => {
        this.setState({
            label : event.target.value
                      })
    };

    defaultValueChangeHandler = (event) => {
        this.setState({
            defaultValue : event.target.value
                      })
    };


    togglePreview = () => {
        this.setState(state =>({
            preview: !state.preview
        }))
    };

    addChoice = (newChoice) => {
        let newChoiceArray = [...this.state.choices];
        newChoiceArray.push({"title":newChoice});

        this.setState({
            choices: newChoiceArray
                      })
    };

    checkDuplicate = (newChoice) => {
        for(let i=0;i<this.state.choices.length ; i++) {
            if(this.state.choices[i].title === newChoice) {
                return true;
            }
        }

        return false;
    };

    /*updateChoice = (index, updatedChoiceTitle) => {
        if(this.checkDuplicate(updatedChoiceTitle))
        {
            alert("This choice already exists.");
            return false;
        } else {

            let newChoiceArray = [...this.state.choices];
            newChoiceArray[index].title = updatedChoiceTitle;

            this.setState({
                              choices : newChoiceArray
                          })
        }
        return true;
    };*/

    updateChoice = (index, updatedChoiceTitle, choiceBeforeUpdate) => {
        if(this.checkDuplicate(updatedChoiceTitle))
        {
            alert("This choice already exists.");
            return false;
        } else {

            let newChoiceArray = [...this.state.choices];
            newChoiceArray[index].title = updatedChoiceTitle;

            this.setState({
                choices : newChoiceArray
            })
        }

        return true;
    }

    deleteChoice = (index) => {
        const first_part_list = this.state.choices.slice(0,index);
        const second_part_list = this.state.choices.slice(index+1);
        let newChoicesArray = [...first_part_list, ...second_part_list];

        this.setState({
            choices : newChoicesArray
                      })
    };

    selectTypeChangeHandler = (event) => {
        if(event.target.checked){
            this.setState({
                              selectType : "multiSelect",
                              selectTypeCheckBoxState : true
                          })
        } else {
            this.setState({
                              selectType : "singleSelect",
                              selectTypeCheckBoxState : false
                          })
        }

    };

    setCurrentSelectedChoice = (index) => {
        this.setState({
            currentSelectedChoice : index
                      })
    };

    orderingChangeHandler = (event) => {
        if(this.state.ordering === "increasing") {
            this.state.choices.sort((choice1, choice2) => {
                let choice1Title = choice1.title.toUpperCase(); // ignore upper and lowercase
                let choice2Title = choice2.title.toUpperCase(); // ignore upper and lowercase
                if (choice1Title < choice2Title) {
                    return 1;
                }
                if (choice1 > choice2Title) {
                    return -1;
                }

                // names must be equal
                return 0;
            })
        }

        if(this.state.ordering === "decreasing") {
            this.state.choices.sort((choice1, choice2) => {
                let choice1Title = choice1.title.toUpperCase(); // ignore upper and lowercase
                let choice2Title = choice2.title.toUpperCase(); // ignore upper and lowercase
                if (choice1Title < choice2Title) {
                    return -1;
                }
                if (choice1 > choice2Title) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
        }

        this.setState({
            ordering : event.target.value
                      })
    };

    checkDefaultInChoice = () => {
        for (let i = 0; i < this.state.choices.length; i++) {
            if (this.state.choices[i].title === this.state.defaultValue) {
                return true;
            }
        }
        return false;
    };

    render() {
        return (
            <div className={"container-fluid"}>
                <br/>
                <br/>
                <div className={"row"}>
                    <div className={"col-sm-3"}></div>
                    <div className={"col-sm-6"}>
                        <h2><b>FIELD BUILDER</b></h2>
                        <hr/>
                    </div>
                    <div className={"col-sm-3"}></div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-3"}></div>
                    <div className={"col-sm-6"}>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1"
                                   onClick = {this.togglePreview} />
                            <label className="custom-control-label" htmlFor="customSwitch1">
                                Toggle Preview
                            </label>
                        </div>
                    </div>
                    <div className={"col-sm-3"}></div>
                </div>

                <br/>

                {
                    !this.state.preview &&
                    <div className={"row"}>
                        <div className={"col-sm-3"}></div>
                        <div className={"col-sm-6"}>
                        <div className={"row"}>
                            <div className={"col-sm-2"}><h4>LABEL:</h4></div>
                            <div className={"col-sm-10"}>
                                <input className={"form-control"} placeholder={"Sales region"} value={this.state.label}
                                       onChange={this.labelChangeHandler}/>
                            </div>
                        </div>
                            <br/>

                        <div className={"row"}>
                            <div className={"col-sm-2"}><h4>TYPE:</h4></div>
                            <div className={"col-sm-3"}><h5>Multi-Select</h5></div>
                            <div className={"col-sm-7"}>
                                <input type={"checkbox"} onClick={this.selectTypeChangeHandler}
                                       defaultChecked={this.state.selectTypeCheckBoxState}/>
                            </div>
                        </div>
                            <br/>
                        <div className={"row"}>
                            <div className={"col-sm-2"}><h4>DEFAULT VALUE:</h4></div>
                            <div className={"col-sm-10"}>
                                <input className={"form-control"} placeholder={"Enter Default Choice"}
                                       value={this.state.defaultValue} onChange={this.defaultValueChangeHandler}/>
                            </div>
                        </div>
                            <br/>
                        <div className={"row"}>
                            <div className={"col-sm-3"}><h4>CHOICES:</h4></div>
                            <div className={"col-sm-9"}>

                                {
                                    this.state.choices.map((choice,index) => {
                                        let defaultSelection = false;
                                        if(choice.title === this.state.defaultValue) {
                                            defaultSelection = true;
                                        }

                                        return <Choice key = {index}
                                                       index = {index}
                                                       choice = {choice}
                                                       updateChoice = {this.updateChoice}
                                                       deleteChoice = {this.deleteChoice}
                                                       defaultSelection = {defaultSelection}
                                        />
                                    })
                                }

                                <button type={"button"} className={"btn btn-secondary"} onClick={()=>{
                                    if(this.state.choices.length>50) {
                                        alert("Maximum number of choices allowed is 50");
                                        return;
                                    }
                                    this.addChoice("---")
                                }}>Add New Choice</button>
                            </div>
                        </div>
                            <br/>
                        <div className={"row"}>
                            <div className={"col-sm-2"}><h4>ORDER:</h4></div>
                            <div className={"col-sm-10"}>
                                <select className={"custom-select"} value={this.state.ordering}
                                        onChange={this.orderingChangeHandler}>
                                    <option value={"noOrdering"}>No Ordering</option>
                                    <option value={"increasing"}>Alphabetically Increasing</option>
                                    <option value={"decreasing"}>Alphabetically Decreasing</option>
                                </select>
                            </div>
                        </div>

                            <br/>
                        <div className={"row"}>
                            <div className={"col-sm-6"}>
                                <button style={{width:"100%"}} type={"button"} className={"btn btn-success"}
                                        onClick={()=> {
                                            let finalState = {...this.state}
                                            let finalChoiceArray = [...this.state.choices]
                                            if(!this.checkDefaultInChoice()) {
                                                finalChoiceArray.push({"title": this.state.defaultValue})
                                                finalState.choices = finalChoiceArray;
                                                this.setState({
                                                    choices: finalChoiceArray
                                                });
                                            }
                                            if(this.state.label !== "" && this.state.label.length !==0) {
                                                console.log(finalState);
                                                fieldService(finalState).then(response => {
                                                    console.log(response);
                                                });
                                                alert("Logged the post data into console!")
                                            } else {
                                                alert("Label cannot be empty!")
                                            }
                                        }
                                    }>Save Changes</button>
                            </div>
                            <div className={"col-sm-6"}>
                                <button style={{width:"100%"}} type={"button"} className={"btn btn-info"} onClick={()=> {
                                    this.setState({
                                                      label : "",
                                                      selectType : "singleSelect",
                                                      selectTypeCheckBoxState : false,
                                                      currentSelectedChoice : -1,
                                                      defaultValue : "",
                                                      choices : [],
                                                      preview : false,
                                                      ordering : "No ordering"
                                                  })
                                }}>Reset</button>
                            </div>
                        </div>

                        </div>
                        <div className={"col-sm-3"}></div>
                    </div>
                }

                {
                    this.state.preview &&
                    <div className={"row"}>
                        <div className={"col-sm-3"}></div>
                        <div className={"col-sm-6"}>
                            <h3>PREVIEW</h3>
                            <hr/>
                            <div className={"row"}>
                                <div className={"col-sm-2"}><h4>LABEL:</h4></div>
                                <div className={"col-sm-10"}><h4>{this.state.label}</h4></div>
                            </div>

                            <br/>

                            <div className={"row"}>
                                <div className={"col-sm-1"}><h4>CHOICES:</h4></div>
                                <div className={"col-sm-11"}>
                                    {
                                        this.state.choices.map((choice,index) => {
                                            let defaultSelection = false;
                                            if(choice.title === this.state.defaultValue) {
                                                defaultSelection = true;
                                            }

                                            return <ChoicePreview
                                                choice = {choice}
                                                index = {index}
                                                setCurrentSelectedChoice = {this.setCurrentSelectedChoice}
                                                currentSelectedChoice = {this.state.currentSelectedChoice}
                                                defaultSelection = {defaultSelection}
                                                selectType = {this.state.selectType}
                                                key = {index+50} // Every component needs to have unique index as a key
                                            />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={"col-sm-3"}></div>

                    </div>
                }

            </div>
        );
    }
}

export default FieldBuilder;
