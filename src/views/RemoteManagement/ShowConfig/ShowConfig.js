import React from "react";
import {Button, Col, Row, Table} from "reactstrap";
import ConfigRow from "./ConfigRow";
import {connect} from "react-redux";
import {getConfigDump} from "../../../actions/configActions";
import * as PropTypes from "prop-types";


function RemoteRows({remotes, refreshHandle}) {

    let returnMap = [];
    let curKey = 1;
    for (const [key, value] of Object.entries(remotes)) {
        returnMap.push((<ConfigRow sequenceNumber={curKey} key={key} remoteName={key} remote={value}
                                   refreshHandle={refreshHandle}/>));
        curKey++;
    }
    return returnMap;
}


class ShowConfig extends React.PureComponent {

    componentDidMount() {
        //Get the configs
        this.props.getConfigDump();
    }

    render() {


        return (
            <div data-test="showConfigComponent">
                <Row>
                    <Col lg={8} className={"mb-4"}>
                        <Button color={"primary"} className={"float-left"}
                                onClick={() => this.props.history.push("/simplenewdrive")}>
                            Create a New Config
                        </Button>
                    </Col>
                    <Col lg={4}>
                        
                    </Col>

                </Row>
                <Table responsive className="table-striped">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <RemoteRows remotes={this.props.remotes} refreshHandle={this.props.getConfigDump}/>
                    </tbody>
                </Table>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    remotes: state.config.configDump,
    hasError: state.config.hasError,
    error: state.config.error

});

ShowConfig.propTypes = {
    remotes: PropTypes.object.isRequired,
    hasError: PropTypes.bool,
    error: PropTypes.object
};

export default connect(mapStateToProps, {getConfigDump})(ShowConfig);
