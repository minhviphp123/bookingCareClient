import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils/constant'
import { withRouter } from 'react-router-dom';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    render() {

        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='homeHeaderContainer'>
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
                                    <b ><FormattedMessage id="homeHeader.speciality" /></b>
                                </div>
                                <div className='bottom'>
                                    <FormattedMessage id="homeHeader.searchDoctor" />
                                </div>
                            </div>
                            <div className="childContent">
                                <div>
                                    <b><FormattedMessage id="homeHeader.healthFacility" /></b>
                                </div>
                                <div className='bottom'><FormattedMessage id="homeHeader.selectRoom" />
                                </div>
                            </div>
                            <div className="childContent">
                                <div>
                                    <b><FormattedMessage id="homeHeader.doctor" /></b>
                                </div>
                                <div className='bottom'><FormattedMessage id="homeHeader.selectDoctor" /></div>
                            </div>
                            <div className="childContent">
                                <div>
                                    <b><FormattedMessage id="homeHeader.fee" /></b>
                                </div>
                                <div className='bottom'><FormattedMessage id="homeHeader.checkHealth" />
                                </div>

                            </div>
                        </div>
                        <div className="rightContent">
                            <div><FormattedMessage id="homeHeader.support" /></div>
                            <div className={language === languages.VI ? "language active" : "language"}>
                                <span onClick={() => this.changeLanguage(languages.VI)} className='span'>VN</span>
                            </div>
                            <div className={language === languages.EN ? "language active" : "language"}>
                                <span onClick={() => this.changeLanguage(languages.EN)} className='span'>EN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner &&
                    <div className='homeHeaderBanner'>
                        <div className='contentUp'>
                            <div className='title1'>NỀN TẢNG Y TẾ</div>
                            <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='search'>
                                <input type="text" className='input' placeholder='Tìm kiếm' />
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
