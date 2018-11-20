import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import AppStore from '../../Store'
import { SetMenuOption, getIntroData } from '../../actions/AppStoreActions'
import { AppStoreState, IItem } from '../../types/StoreTypes'
import { ITextData } from '../../types/TextDataTypes'
import { TextDataDisplay } from '../includes/TextDataDisplay'

interface IMenuStateProperties {
    menuItems: IItem[];
    introURL: string;
    menuOption: IItem;
    introData: ITextData;
}

interface IMenuDispatchProperties {
    setPage: Function;
    getIntro: Function;
}
interface IMenuLocalState {
    toggle?: boolean;
}

export class Menu extends React.Component<IMenuStateProperties & IMenuDispatchProperties, IMenuLocalState>
{
    constructor(props: any) {
        super(props);

        this.state = {
            toggle: false,
        };
    }
    componentDidMount() {
        this.props.getIntro(this.props.introURL, true);
    }


    render() {

        return (
            <div>
                <ul>
                    {this.props.menuItems.map(function (content: IItem, index: number) {
                        let cls: string = content.name;
                        if (content.path === window.location.pathname) {
                            cls += ' active';
                            this.props.setPage(content);
                        }
                        return (
                            <li key={'menu' + index} className={cls}>
                                <a href={content.path} >
                                    {content.name}
                                </a>
                            </li>
                        );
                    }, this)}
                    {this.props.introData &&
                        <li className={this.props.menuOption.showAbout || this.state.toggle ? 'about active' : 'about'}>
                            <a onClick={() => { if (!this.props.menuOption.showAbout) { this.setState({ toggle: !this.state.toggle }); } }}>
                                about
                            </a>
                        </li>
                    }

                </ul>
                {this._showAboutMe() &&
                    <div className='about-box'>
                        <TextDataDisplay data={this.props.introData} />
                    </div>
                }
            </div>
        );
    }
    private _showAboutMe = () => {
        if (window.innerWidth >= 768) {
            if (this.props.menuOption.showAbout) {
                return true;
            }
            if (this.state.toggle) {
                return true;
            }
        }
        return false;
    }
}

const mapStateToProps = (state: AppStoreState, ownProp?: any): IMenuStateProperties => ({
    menuItems: state.menuItems,
    menuOption: state.menuOption,
    introURL: state.introURL,
    introData: state.introData,
});

const mapDispatchToProps = (dispatch: any): IMenuDispatchProperties => ({
    setPage: (menuOption) => {
        dispatch(SetMenuOption(menuOption))
    },
    getIntro: (url) => {
        dispatch(getIntroData(url))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);