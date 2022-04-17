import * as React from 'react';
import StackGrid from "react-stack-grid";
import { IGalleryData, GalleryItemType } from '../../types/GalleryTypes'

export interface IGalleryDisplayProps {
  data: (IGalleryData[])[];
  type: GalleryItemType;
}

interface IGalleryDisplayState {
  data: IGalleryData[];
  chunk: number;
  zoomed?: string;
  caption?: string;
}

export class Gallery extends React.Component<IGalleryDisplayProps, IGalleryDisplayState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.props.data[0],
      chunk: 0,
    };
  }

  resize = () => this.forceUpdate();

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this._listenScrollEvent);
  }

  componentWillMount() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', (this._listenScrollEvent));
  }
  componentWillReceiveProps(nextProps: IGalleryDisplayProps) {

    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data[0], chunk: 0 });
    }

  }

  render() {

    return (
      <div>
        {this.state.zoomed &&
          <div className='zoomer' onClick={() => { this.setState({ zoomed: undefined, caption: undefined }); }}>
            <div>
              <img src={this.state.zoomed} />
              <div className='caption'>{this.state.caption}</div>
            </div>
          </div>
        }
        <StackGrid
          columnWidth={this._columnWidth()}
          key={this.props.type}
          monitorImagesLoaded={true}
          className='gallery-tiles'
        >
          {this.state.data.map(function (content: IGalleryData, index: number) {
            if (content) {

              let url: string = 'https://polina.space/ng4/data/img/JPEG/' + content.file.substr(0, (content.file.length - 12)) + '.jpg';;
              let zoom: string = 'https://polina.space/ng4/data/img/' + content.file.substr(0, (content.file.length - 12)) + content.file.substr(-4);
              return (
                <a
                  onClick={() => { this.setState({ zoomed: zoom, caption: content.title }); }}
                  key={index} className='tile' >
                  <img src={url} />
                  <div className='caption'>{content.title}</div>
                </a>
              );
            }
          }, this)}
        </StackGrid>
      </div>
    );
  }
  private _columnWidth = () => {
    if (window.innerWidth >= 1024) {
      return '25%';
    } else {
      if (window.innerWidth >= 768) {
        return '33%';
      } else {
        if (window.innerWidth >= 600) {
          return '50%';
        }
      }
    }
    return '100%';
  }
  private _listenScrollEvent = (): void => {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      let next: number = this.state.chunk + 1;
      if (next < this.state.data.length) {
        this.setState({
          chunk: next,
          data: this.state.data.concat(this.props.data[next])
        });
      }
    }

  }
}