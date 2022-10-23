import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils/constant'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CustomScrollbars from '../../components/CustomScrollbars';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                abc: 'Cơ Xương Khớp'
            },
            {
                abc: 'minh'
            },
            {
                abc: 'minh'
            }
            ],
            allSpecialty: [],
            isShowLinks: false,
            nameUser: '',
            avt: ''
        }
    }

    hdlClickSpe = () => {
        if (this.props.history) {
            this.props.history.push('/detailSpecialty/6335153cc5d6be2bcff48bb4');
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    handleClickInput = () => {
        this.setState({
            isShowLinks: true
        })
    }



    handleOnBlur = () => {
        setTimeout(() => {
            this.setState({
                isShowLinks: false
            })
        }, 100);
    }

    handleLogOut = () => {
        this.props.processLogout();
    }

    componentDidMount() {
        this.props.getAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                allSpecialty: this.props.allSpecialty
            })
        }
    }

    render() {

        let language = this.props.language;
        let { allSpecialty } = this.state;
        let { isLoggedIn } = this.props;
        console.log(isLoggedIn);
        console.log(this.props.userInfo);
        return (
            <React.Fragment>
                {!isLoggedIn ?
                    <div className='homeHeaderContainer' onClick={this.hideLinks}>
                        <div className='homeHeaderContent'>
                            <div className="leftContent">
                                <div className='menu'>Menu</div>
                                <div className="headerLogo" onClick={this.returnHome}
                                    style={{ cursor: "pointer" }}
                                ></div>
                            </div>
                            <div className="centerContent">
                                <div className="childContent">
                                    <div>
                                        <Link to='/home/specialty' style={{ color: "black" }}><FormattedMessage id="homeHeader.speciality" /></Link>
                                    </div>
                                    <div className='bottom'>
                                        <FormattedMessage id="homeHeader.searchDoctor" />
                                    </div>
                                </div>
                                <div className="childContent">
                                    <div>
                                        <Link to='/home/facility' style={{ color: "black" }}><FormattedMessage id="homeHeader.healthFacility" /></Link>
                                    </div>
                                    <div className='bottom'><FormattedMessage id="homeHeader.selectRoom" />
                                    </div>
                                </div>
                                <div className="childContent">
                                    <div>
                                        <Link to='/home/doctor' style={{ color: "black" }}><FormattedMessage id="homeHeader.doctor" /></Link>
                                    </div>
                                    <div className='bottom'><FormattedMessage id="homeHeader.selectDoctor" /></div>
                                </div>
                                <div className="childContent">
                                    <div>
                                        <Link to='/home/package' style={{ color: "black" }}><FormattedMessage id="homeHeader.fee" /></Link>
                                    </div>
                                    <div className='bottom'><FormattedMessage id="homeHeader.checkHealth" />
                                    </div>
                                </div>
                            </div>
                            <div className="rightContent">
                                <div className='support'><FormattedMessage id="homeHeader.support" />
                                </div>
                                <div className='login'>
                                    <button className='bt'>
                                        <Link to='/login' style={{ color: "white" }}><FormattedMessage id="homeHeader.login" /></Link>
                                    </button>

                                </div>
                                <div className={language === languages.VI ? "language active" : "language"}>
                                    <span onClick={() => this.changeLanguage(languages.VI)} className='span'>VN</span>
                                </div>
                                <div className={language === languages.EN ? "language active" : "language"}>
                                    <span onClick={() => this.changeLanguage(languages.EN)} className='span'>EN</span>
                                </div>
                                {/* <div className="btn btn-logout" onClick={this.handleLogOut} title='Log out'>
                                    <i className="fas fa-sign-out-alt"></i>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    :
                    ((this.props.userInfo.role === 'User') ?
                        <div className='homeHeaderContainer' onClick={this.hideLinks}>
                            <div className='homeHeaderContent'>
                                <div className="leftContent">
                                    <div className="headerLogo" onClick={this.returnHome}
                                        style={{ cursor: "pointer" }}
                                    ></div>
                                </div>
                                <div className="centerContent">
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/specialty' style={{ color: "black" }}><FormattedMessage id="homeHeader.speciality" /></Link>
                                        </div>
                                        <div className='bottom'>
                                            <FormattedMessage id="homeHeader.searchDoctor" />
                                        </div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/facility' style={{ color: "black" }}><FormattedMessage id="homeHeader.healthFacility" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.selectRoom" />
                                        </div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/doctor' style={{ color: "black" }}><FormattedMessage id="homeHeader.doctor" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.selectDoctor" /></div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/package' style={{ color: "black" }}><FormattedMessage id="homeHeader.fee" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.checkHealth" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rightContent">
                                    <div className='support'><FormattedMessage id="homeHeader.support" />
                                    </div>
                                    <div className='loginn'>
                                        <div className='avt'>
                                            <img src={Buffer.from(this.props.userInfo.avt, 'base64').toString('binary')} alt="" />
                                        </div>
                                        <div className='name'>
                                            {this.props.userInfo.name}
                                        </div>
                                    </div>
                                    <div className={language === languages.VI ? "language active" : "language"}>
                                        <span onClick={() => this.changeLanguage(languages.VI)} className='span'>VN</span>
                                    </div>
                                    <div className={language === languages.EN ? "language active" : "language"}>
                                        <span onClick={() => this.changeLanguage(languages.EN)} className='span'>EN</span>
                                    </div>
                                    <div className="btn btn-logout" onClick={this.handleLogOut} title='Log out'>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        (<div className='homeHeaderContainer' onClick={this.hideLinks}>
                            <div className='homeHeaderContent'>
                                <div className="leftContent">
                                    <div className="headerLogo" onClick={this.returnHome}
                                        style={{ cursor: "pointer" }}
                                    ></div>
                                </div>
                                <div className="centerContent">
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/specialty' style={{ color: "black" }}><FormattedMessage id="homeHeader.speciality" /></Link>
                                        </div>
                                        <div className='bottom'>
                                            <FormattedMessage id="homeHeader.searchDoctor" />
                                        </div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/facility' style={{ color: "black" }}><FormattedMessage id="homeHeader.healthFacility" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.selectRoom" />
                                        </div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/doctor' style={{ color: "black" }}><FormattedMessage id="homeHeader.doctor" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.selectDoctor" /></div>
                                    </div>
                                    <div className="childContent">
                                        <div>
                                            <Link to='/home/package' style={{ color: "black" }}><FormattedMessage id="homeHeader.fee" /></Link>
                                        </div>
                                        <div className='bottom'><FormattedMessage id="homeHeader.checkHealth" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rightContent">
                                    <div className='support'><FormattedMessage id="homeHeader.support" />
                                    </div>
                                    <div className='loginn'>
                                        <div className='sysLink'><Link to={'/system'}>SYSTEM</Link></div>
                                        <div className='avt'>
                                            <img src={Buffer.from(this.props.userInfo.avt, 'base64').toString('binary')} alt="" />
                                        </div>
                                        <div className='name'>
                                            {this.props.userInfo.name}
                                        </div>
                                    </div>
                                    <div className={language === languages.VI ? "language active" : "language"}>
                                        <span onClick={() => this.changeLanguage(languages.VI)} className='span'>VN</span>
                                    </div>
                                    <div className={language === languages.EN ? "language active" : "language"}>
                                        <span onClick={() => this.changeLanguage(languages.EN)} className='span'>EN</span>
                                    </div>
                                    <div className="btn btn-logout" onClick={this.handleLogOut} title='Log out'>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    )
                }

                {this.props.isShowBanner &&
                    <div className='homeHeaderBanner'>
                        <div className='contentUp'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                {/* <input type="text" list="data" onChange={this._onChange} /> */}
                                <input type="text" className='input' list='data' placeholder='Tìm kiếm Chuyên Khoa' onClick={this.handleClickInput} onBlur={this.handleOnBlur} />
                                {this.state.isShowLinks &&
                                    <div className="linkList">
                                        {allSpecialty.map((item, key) =>
                                            <Link to={`/detailSpecialty/${item._id}`}
                                                style={{
                                                    display: "inline-block"
                                                }}
                                                className='link'
                                            >{item.name}</Link>
                                        )}
                                    </div>

                                }
                            </div>
                        </div>
                        <div className='contentDown'>
                            <div className='options'>
                                <div className="optionChild">
                                    Khám Chuyên khoa
                                </div>
                                <div className="optionChild">
                                    Khám từ xa

                                </div>
                                <div className="optionChild">
                                    Khám tổng quát
                                </div>
                                <div className="optionChild">
                                    Xét nghiệm y học
                                </div>
                                <div className="optionChild">
                                    Sức khỏe
                                    tinh thần
                                </div>
                                <div className="optionChild">
                                    Khám
                                    nha khoa

                                </div>
                                <div className="optionChild">
                                    Gói
                                    Phẫu thuật
                                </div>
                                <div className="optionChild">
                                    Sản phẩm
                                    Y tế
                                </div>
                                <div className="optionChild">
                                    Sức khỏe
                                    Doanh nghiệp
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        allSpecialty: state.admin.allSpecialty,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialty: () => dispatch(actions.getAllSpecialty()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
