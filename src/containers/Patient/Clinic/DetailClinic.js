import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { Link } from 'react-router-dom';
import { createLogger } from 'redux-logger';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicById: []
        }
    }

    componentDidMount() {
        this.props.getClinicById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.clinicById !== this.props.clinicById) {
            this.setState({
                clinicById: this.props.clinicById
            })
        }
    }

    render() {
        let { clinicById } = this.state;
        console.log(clinicById);
        return (
            <div className='DetailClinicPage' style={{ color: "green" }}>
                <HomeHeader />

                {clinicById && clinicById.length > 0 &&
                    clinicById.map((item) =>
                        <div>
                            <div className='doctorDiv'>
                                <img src={Buffer.from(item.img, 'base64').toString('binary')} alt="" className='iii'
                                    style={{
                                        width: "100%",
                                        borderRadius: "0%"
                                    }}
                                />
                            </div>
                            <div style={{
                                textAlign: "center"
                            }}>
                                <i className='I'>{item.name}</i>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clinicById: state.admin.clinicById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClinicById: (id) => dispatch(actions.getClinicById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
