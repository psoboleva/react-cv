import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import ReactJson from 'react-json-view'

import AppStore from '../../Store'
import { getData } from '../../actions/AppStoreActions'
import { AppStoreState, IItem, IPageProperties, commonProperties, ICV } from '../../types/StoreTypes'
import { Preloader, Error } from '../includes/Utilities'
import { TextDataDisplay } from '../includes/TextDataDisplay'

interface CVPageStateProperties extends IPageProperties {
    data: ICV,
}

interface CVPageDispatchProperties {
    fetchData: Function;
}

export class CVPage extends React.Component<CVPageStateProperties & CVPageDispatchProperties, any>
{
    componentDidMount() {
        if (this.props.menuOption.dataUrl) {
            this.props.fetchData(this.props.menuOption.dataUrl);
        }
    }

    render() {

        const page: IItem = this.props.menuOption;

        return (
            <div className={'page-' + page.name}>
                <h1>{page.title}</h1>
                {this.props.dataLoading && <Preloader />}
                {this.props.dataError && <Error />}
                {this.props.data &&
                    <ReactJson
                        src={this.props.data}
                        collapsed={2}
                        displayObjectSize={false}
                        displayDataTypes={false}
                        theme={'monokai'}
                        iconStyle={'square'}
                        name={'CV'}
                    />}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreState, ownProp?: any) => ({
    ...commonProperties(state)
});

const mapDispatchToProps = (dispatch: any): CVPageDispatchProperties => ({
    fetchData: (url) => {
        dispatch(getData(url))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CVPage);