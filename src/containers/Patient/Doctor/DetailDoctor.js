import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import BookModal from './BookModal';
import './DetailDoctor.scss';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],//markdown
            // isOpenBookModal: false
        }
    }

    clickBooking = () => {
        this.setState({
            isOpenBookModal: true
        })
    }

    toggleModel = () => {
        this.setState({
            isOpenBookModal: false
        })
    }

    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: 769169294381449,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    async componentDidMount() {
        this.props.getDetailDoctor(this.props.match.params.id);
        this.initFacebookSDK();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            })
        }
    }

    render() {
        let detailDoctor = this.state.detailDoctor;
        let isOpenBookModal = this.state.isOpenBookModal;
        console.log(detailDoctor);
        return (
            <div className='detailDoctorPage' style={{ color: "green" }}>
                {isOpenBookModal && <BookModal isOpen={this.state.isOpenBookModal}
                    toggleFromParent={this.toggleModel} />}
                <HomeHeader isShowBanner={false} />
                <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                <div className="doctorDetailDiv">
                    {detailDoctor && detailDoctor.map((item) =>
                        <div className='intro'>
                            <div className='avtt'>
                                <img src={Buffer.from(item.doctorId.avt, 'base64').toString('binary')} alt="" className='iii' />
                            </div>
                            <div className='text'>
                                <div className='name'>{item.doctorId.name}</div>
                                <small dangerouslySetInnerHTML={{ __html: item.contentHTML }}>
                                </small><br />
                                <small>{item.desc}</small>
                            </div>
                        </div>
                    )}
                    <div className='schedule'>
                        <div className="content-left">
                            <DoctorSchedule doctorId={detailDoctor[0]}
                                dataFromParent={detailDoctor[0]}
                            />
                        </div>

                        <div className="content-right">
                            {detailDoctor && detailDoctor.length > 0 &&
                                detailDoctor.map((item, index) =>
                                    <div key={index}>
                                        <div className='nameAndAddressCli'>
                                            <h2 className='addrTitle'>Address</h2>
                                            <p className='cliName'>{item.nameClinic}</p>
                                            <p className='addrName'>{item.addressClinic}</p>
                                        </div>
                                        <div className="price">
                                            <span className='PriceText'>PRICE</span>: <span className='priceValue'>{item.price}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailDoctor: state.admin.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (id) => dispatch(actions.getDetailDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
