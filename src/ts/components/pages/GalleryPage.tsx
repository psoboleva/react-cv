
import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import AppStore from '../../Store'
import { getData, getGalleryData, filterGalleryData } from '../../actions/AppStoreActions'
import { AppStoreState, IItem, IPageProperties, commonProperties } from '../../types/StoreTypes'
import { IGalleryData, GalleryItemType } from '../../types/GalleryTypes'
import { Preloader, Error } from '../includes/Utilities'
import { Gallery } from '../includes/GalleryDataDisplay'

interface GalleryPageStateProperties extends IPageProperties {
    data: IGalleryData[];
    chunkedData?: (IGalleryData[])[];
    itemType?: GalleryItemType;
}

interface GalleryPageDispatchProperties {
    fetchData: Function;
    filter: Function;
}

export class GalleryPage extends React.Component<GalleryPageStateProperties & GalleryPageDispatchProperties, {}>
{
    componentDidMount() {
        if (this.props.menuOption.dataUrl) {
            this.props.fetchData(this.props.menuOption.dataUrl, true);
        }
    }


    render() {

        const page: IItem = this.props.menuOption;

        return (
            <div className={'page-' + page.name}>
                <h1>{page.title}</h1>
                {this.props.dataLoading && <Preloader />}
                {this.props.dataError && <Error />}
                {(this.props.data && !this.props.dataLoading && !this.props.dataError) &&
                    <div>
                        <div className='selector'>
                            {Object.keys(GalleryItemType).map(function (name: string, ind: number) {
                                return (
                                    <a
                                        key={ind}
                                        className={this.props.itemType === GalleryItemType[name] ? GalleryItemType[name] + ' active' : GalleryItemType[name]}
                                        onClick={() => { this.props.filter(this.props.data, GalleryItemType[name]); }}
                                    >
                                        {GalleryItemType[name]}
                                    </a>
                                );
                            }, this)}
                        </div>
                        <Gallery
                            data={this.props.chunkedData}
                            type={this.props.itemType ? this.props.itemType : GalleryItemType.All}
                        />


                    </div>
                }
            </div>
        );
    }



}

const mapStateToProps = (state: GalleryPageStateProperties, ownProp?: any): GalleryPageStateProperties => ({
    chunkedData: state.chunkedData,
    itemType: state.itemType,
    ...commonProperties(state),
});

const mapDispatchToProps = (dispatch: any): GalleryPageDispatchProperties => ({
    fetchData: (url) => {
        dispatch(getGalleryData(url))
    },
    filter: (data, type) => {
        dispatch(filterGalleryData(data, type))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);