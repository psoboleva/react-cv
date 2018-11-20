import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import AppStore from '../../Store'
import { getData } from '../../actions/AppStoreActions'
import { AppStoreState, IItem, IPageProperties, commonProperties } from '../../types/StoreTypes'
import { ITextData } from '../../types/TextDataTypes'
import { Preloader, Error } from '../includes/Utilities'
import { TextDataDisplay } from '../includes/TextDataDisplay'

interface TextPageStateProperties extends IPageProperties {
    data: ITextData,
}

interface TextPageDispatchProperties {
    fetchData: Function;
}

export class TextPage extends React.Component<TextPageStateProperties & TextPageDispatchProperties, any>
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
                {this.props.data && <TextDataDisplay data={this.props.data} />}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStoreState, ownProp?: any) => ({
    ...commonProperties(state)
});

const mapDispatchToProps = (dispatch: any): TextPageDispatchProperties => ({
    fetchData: (url) => {
        dispatch(getData(url))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TextPage);