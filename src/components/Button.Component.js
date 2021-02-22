import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

        };
    }

    onButtonClick = event => {
        this.setState({
                          isLoading: true
                      });

        return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            this.setState({
                              isLoading: false,
                          });
        });
    };

    render() {
        return (

            <button style={{width: "100%"}} type={"button"}
                    disabled={this.state.isLoading}
                    className={"btn btn-info"} onClick={() => {
                this.onButtonClick();
            }}>
                <i className="fa fa-undo"/> &nbsp;
                {this.state.isLoading ? "Loading..." : "Reset"}
            </button>
        );
    }
}

export default Button;

